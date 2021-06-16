const jwt = require('jsonwebtoken');

const TOKEN_SECRET = "MY_SECRET";

const myToken = {
  // 根据数据和secret 生成token
  encrypt(data, time) {
    return jwt.sign(data, TOKEN_SECRET, {
      expiresIn: time || '24h'
    });
  },
  // 获取token信息
  decrypt(token) {
    try {
      const data = jwt.verify(token, TOKEN_SECRET);
      return {
        token: true,
        data
      }
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  },
  // 校验token
  checkToken(req, res, next) {
    const token = req.headers.authorization;
    const data = myToken.decrypt(token);
    console.log('token', data);
    if (data.token) {
      const id = data.id;
      next();
      return;
    }
    res.json({
      code: 401,
      data: null,
      msg: '用户信息已失效，请重新登录'
    })
  }
};

module.exports = myToken;