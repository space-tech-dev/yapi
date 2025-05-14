/**
 * 测试环境变量配置加载
 */
const config = require('./server/utils/config-env.js');
console.log('配置加载测试结果:');
console.log(JSON.stringify(config, null, 2));
