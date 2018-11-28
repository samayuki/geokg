import {Router} from 'express';
import config from '../config';
import users  from './users';
import dbsource from  './dbsource';
import storeToDB from './storeToDB'
import map  from './map';
import crawler from './crawler'
import uploadToken from './uploadToken'
const router = Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodb.url,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, '数据库连接失败:'));
db.once('open', function() {
  console.log('数据库已连接');
});


/**用户注册登录选择*/
router.use(users);
/**所有数据库信息*/
router.use(dbsource);
/**地图信息*/
router.use(map);
/**爬虫模块*/
router.use(crawler);
/**新建数据项**/
router.use(storeToDB);
/**七牛云获取token**/
router.use(uploadToken);

module.exports = router;
