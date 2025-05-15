const axios = require('axios');
const yapi = require('../yapi.js');
const userModel = require('../models/user.js');

class KeycloakService {
  constructor() {
    // Load Keycloak config from environment variables or WEBCONFIG
    const { keycloakConfig } = yapi.WEBCONFIG;
    
    if (!keycloakConfig) {
      throw new Error('Keycloak configuration is missing');
    }
    
    this.config = keycloakConfig;
    this.userInst = yapi.getInst(userModel);
  }

  /**
   * Get Keycloak authorization URL
   * @returns {String} Authorization URL
   */
  getAuthorizationUrl() {
    const { authServerUrl, realm, clientId, redirectUri } = this.config;
    const baseUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/auth`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile'
    });
    
    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for tokens
   * @param {String} code - Authorization code
   * @returns {Object} Tokens object containing access_token, refresh_token, etc.
   */
  async getTokens(code) {
    const { authServerUrl, realm, clientId, clientSecret, redirectUri } = this.config;
    const tokenUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/token`;
    
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code
    });
    
    try {
      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      return response.data;
    } catch (error) {
      yapi.commons.log(error, 'error');
      throw new Error('Failed to fetch tokens from Keycloak');
    }
  }

  /**
   * Get user info from Keycloak
   * @param {String} accessToken - Access token
   * @returns {Object} User information
   */
  async getUserInfo(accessToken) {
    const { authServerUrl, realm } = this.config;
    const userInfoUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/userinfo`;
    
    try {
      const response = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      return response.data;
    } catch (error) {
      yapi.commons.log(error, 'error');
      throw new Error('Failed to fetch user info from Keycloak');
    }
  }

  /**
   * Handle Keycloak OAuth callback
   * @param {Object} ctx - Koa context
   * @returns {Object} User information
   */
  async handleCallback(ctx) {
    const { code } = ctx.query;
    
    if (!code) {
      throw new Error('Authorization code is missing');
    }
    
    // Exchange code for tokens
    const tokens = await this.getTokens(code);
    
    // Get user info
    const userInfo = await this.getUserInfo(tokens.access_token);
    
    // Handle user registration or login
    return await this.handleUserAuth(userInfo);
  }

  /**
   * Handle user authentication (registration or login)
   * @param {Object} userInfo - User information from Keycloak
   * @returns {Object} User information
   */
  async handleUserAuth(userInfo) {
    if (!userInfo.email) {
      throw new Error('Email is required from Keycloak');
    }
    
    let user = await this.userInst.findByEmail(userInfo.email);
    
    // Register new user if not exists
    if (!user) {
      const username = userInfo.preferred_username || userInfo.email.split('@')[0];
      const passsalt = yapi.commons.randStr();
      
      const userData = {
        username,
        email: userInfo.email,
        password: yapi.commons.generatePassword(passsalt, passsalt),
        passsalt,
        role: 'member',
        add_time: yapi.commons.time(),
        up_time: yapi.commons.time(),
        type: 'third'
      };
      
      user = await this.userInst.save(userData);
      
      // Send welcome email
      yapi.commons.sendMail({
        to: userInfo.email,
        contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用YApi平台，你的账号是：${userInfo.email}</p>`
      });
    }
    
    return user;
  }

  /**
   * Refresh access token
   * @param {String} refreshToken - Refresh token
   * @returns {Object} Tokens object containing new access_token, etc.
   */
  async refreshToken(refreshToken) {
    const { authServerUrl, realm, clientId, clientSecret } = this.config;
    const tokenUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/token`;
    
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    });
    
    try {
      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      return response.data;
    } catch (error) {
      yapi.commons.log(error, 'error');
      throw new Error('Failed to refresh token');
    }
  }
}

module.exports = KeycloakService; 