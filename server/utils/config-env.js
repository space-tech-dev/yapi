/**
 * 从环境变量中读取配置信息
 */

// 立即执行一次调试输出
console.log('config-env.js 被加载');
console.log('当前环境变量: YAPI_PORT =', process.env.YAPI_PORT);
console.log('当前环境变量: YAPI_ADMIN_ACCOUNT =', process.env.YAPI_ADMIN_ACCOUNT);

function getConfigFromEnv() {
  // 打印当前环境变量中的 YAPI 配置
  console.log('getConfigFromEnv 被调用');
  console.log('环境变量: YAPI_PORT =', process.env.YAPI_PORT);

  const config = {
    // 基本配置
    port: process.env.YAPI_PORT || '3000',
    adminAccount: process.env.YAPI_ADMIN_ACCOUNT || 'admin@admin.com',
    timeout: parseInt(process.env.YAPI_TIMEOUT || '120000'),
    
    // 数据库配置
    db: {
      servername: process.env.YAPI_DB_SERVERNAME || 'mongodb',
      DATABASE: process.env.YAPI_DB_NAME || 'yapi',
      port: parseInt(process.env.YAPI_DB_PORT || '27017'),
      user: process.env.YAPI_DB_USER || 'test1',
      pass: process.env.YAPI_DB_PASS || 'test1',
      authSource: process.env.YAPI_DB_AUTH_SOURCE || 'admin',
      connectString: process.env.YAPI_DB_CONNECT_STRING || '' // 自定义连接字符串
    },
    
    // 邮件配置
    mail: {
      enable: process.env.YAPI_MAIL_ENABLE === 'true',
      host: process.env.YAPI_MAIL_HOST || 'smtp.163.com',
      port: parseInt(process.env.YAPI_MAIL_PORT || '465'),
      from: process.env.YAPI_MAIL_FROM || '',
      auth: {
        user: process.env.YAPI_MAIL_USER || '',
        pass: process.env.YAPI_MAIL_PASS || ''
      }
    },
    
    // 其他可能的配置项
    closeRegister: process.env.YAPI_CLOSE_REGISTER === 'true',
    ldapLogin: process.env.YAPI_LDAP_LOGIN === 'true' ? 
      {
        enable: process.env.YAPI_LDAP_LOGIN_ENABLE === 'true',
        server: process.env.YAPI_LDAP_SERVER || '',
        baseDn: process.env.YAPI_LDAP_BASE_DN || '',
        bindPassword: process.env.YAPI_LDAP_BIND_PASSWORD || '',
        searchDn: process.env.YAPI_LDAP_SEARCH_DN || '',
        searchStandard: process.env.YAPI_LDAP_SEARCH_STANDARD || ''
      } : undefined,
    
    // 日志配置
    logFilePath: process.env.YAPI_LOG_FILE_PATH || ''
  };
  
  console.log('环境变量配置已生成，port =', config.port);
  return config;
}

const envConfig = getConfigFromEnv();
console.log('导出环境变量配置', envConfig.port);
module.exports = envConfig;
