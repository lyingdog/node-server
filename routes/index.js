var express = require('express');
var router = express.Router();
var Token = require('../utils/token');

/* GET home page. */
router.post('/login', function(req, res, next) {
  const data = {
    name: 'yyh',
    age: 27
  };
  const t = Token.encrypt(data);
  res.json({
    code: 0,
    data: t,
    msg: '操作成功'
  })
});

module.exports = router;
