const express = require('express');
const router = express.Router();
const { createUpload } = require('../utils/upload-form');
const fs = require('fs');

router.post('/', function(req, res, next) {
  // 配置路径
  const form = createUpload('./public/upload');
  // 解析文件
  form.parse(req, function (err, fields, files) {
    console.log('files', files);
    const file = files.file[0];
    // 重命名文件名
    const name = Date.now() + '-' + file.originalFilename;
    const oldPath = file.path;
    const newPath = form.uploadDir + "/" + name;
    fs.renameSync(oldPath, newPath);

    res.json({
      code: 0,
      data: newPath,
      msg: '操作成功'
    })
  });
});

module.exports = router;