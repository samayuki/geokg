/* 七牛云配置 */
const qiniu = require('qiniu');

// 创建上传凭证
const accessKey = 'WElJoKWtZBn_XDAZfVJQWs5Zd0JuABvyCrrFTIg2';
const secretKey = 'QypTNe-MVc1jBJNimI9tKge56_F5u-0MLSWbKc1F';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'sysu-geokg',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = uploadToken;
