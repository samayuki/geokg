const express = require('express')
const jwt = require("jsonwebtoken")
const expressWebToken = require("express-jwt")
const config = require( '../config');
const router = express.Router();
const app = express();

const jwtSecret = 'super_secret';
const jwtExpire = '168h';

router.use(expressWebToken({
  requestProperty: "account",
  credentialsRequired: false,
  secret: jwtSecret,
}));

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next()
});

/**
 * @desc 用户登录
 * @return 返回 登陆信息
 * */
router.post('/login', async (req, res, next) => {
  console.log('= = = = = = = = USER LOGIN = = = = = = = = ');
  let findUser = "";
  let checkPwd = "";
  let users = config.users;
  for(let  i = 0; i < users.length; i++) {
    if(users[i].username === req.body.username) {
      findUser = users[i].username;
      checkPwd = users[i].password;
    }
  }
  let inputPwd = req.body.password;
  if (findUser === "") {
    res.status(401).json({ message: '用户名或者密码错误' })
  }
  else {
    if (checkPwd === inputPwd) {
      let account = { id: 123, username : req.body.username };
      const token = jwt.sign(account, jwtSecret, {
        expiresIn: jwtExpire
      });
      return res.json({ username: req.body.username, token })
    } else {
      res.status(401).json({ message: '用户名或者密码错误' })
    }
  }
});

module.exports = router;
