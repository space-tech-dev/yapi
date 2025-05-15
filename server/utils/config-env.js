const path = require('path');
require('dotenv').config();

/**
 * 从环境变量中读取配置信息
 */

// 立即执行一次调试输出
console.log('config-env.js 被加载');
console.log('当前环境变量: YAPI_PORT =', process.env.YAPI_PORT);
console.log('当前环境变量: YAPI_ADMIN_ACCOUNT =', process.env.YAPI_ADMIN_ACCOUNT);

// 配置优先级：环境变量 > .env 文件 > 默认值
function getConfig() {
  const config = {
    port: process.env.YAPI_PORT || 3000,
    adminAccount: process.env.YAPI_ADMIN_ACCOUNT || 'admin@example.com',
    timeout: Number(process.env.YAPI_TIMEOUT || 120000),
    closeRegister: process.env.YAPI_CLOSE_REGISTER === 'true',
    db: {
      servername: process.env.YAPI_DB_SERVERNAME || '127.0.0.1',
      DATABASE: process.env.YAPI_DB_DATABASE || 'yapi',
      port: process.env.YAPI_DB_PORT || 27017,
      user: process.env.YAPI_DB_USER || '',
      pass: process.env.YAPI_DB_PASS || '',
      authSource: process.env.YAPI_DB_AUTH_SOURCE || ''
    },
    mail: {
      enable: process.env.YAPI_MAIL_ENABLE === 'true',
      host: process.env.YAPI_MAIL_HOST,
      port: process.env.YAPI_MAIL_PORT,
      from: process.env.YAPI_MAIL_FROM,
      auth: {
        user: process.env.YAPI_MAIL_USER,
        pass: process.env.YAPI_MAIL_PASS
      }
    }
  };

  // LDAP 配置
  if (process.env.YAPI_LDAP_LOGIN_ENABLE === 'true') {
    config.ldapLogin = {
      enable: true,
      server: process.env.YAPI_LDAP_LOGIN_SERVER,
      baseDn: process.env.YAPI_LDAP_LOGIN_BASE_DN,
      bindPassword: process.env.YAPI_LDAP_LOGIN_BIND_PASSWORD,
      searchDn: process.env.YAPI_LDAP_LOGIN_SEARCH_DN,
      searchStandard: process.env.YAPI_LDAP_LOGIN_SEARCH_STANDARD || 'LDAP',
      emailPostfix: process.env.YAPI_LDAP_LOGIN_EMAIL_POSTFIX || '',
      emailKey: process.env.YAPI_LDAP_LOGIN_EMAIL_KEY || 'mail',
      usernameKey: process.env.YAPI_LDAP_LOGIN_USERNAME_KEY || 'name'
    };
  }

  // Keycloak OAuth2 配置
  if (process.env.YAPI_KEYCLOAK_ENABLE === 'true') {
    config.keycloakConfig = {
      authServerUrl: process.env.YAPI_KEYCLOAK_AUTH_SERVER_URL,
      realm: process.env.YAPI_KEYCLOAK_REALM,
      clientId: process.env.YAPI_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.YAPI_KEYCLOAK_CLIENT_SECRET,
      redirectUri: process.env.YAPI_KEYCLOAK_REDIRECT_URI
    };
  }

  return config;
}

const envConfig = getConfig();
console.log('导出环境变量配置', envConfig.port);
module.exports = envConfig;
