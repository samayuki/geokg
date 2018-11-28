/*
 * 平台验证
 */
const config = {
  users:  [{"username":"susie","password":"123456"}],
  mongodb: {
      url: 'sysu:sysu2018@ds113693.mlab.com:13693/geokg', // 链接mongodb//heygrandpa:SYSU2018@ds117691.mlab.com:17691/
      domain: 'mlab.com', // 主域名
      scheme: 'mongodb', // 协议
      database: 'geokg', // 数据库名称
      username: 'sysu', // 管理员用户名称
      password: 'sysu2018'// 管理员密码
  }
};

module.exports = config;
