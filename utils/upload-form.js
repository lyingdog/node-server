const multiparty = require('multiparty')

const createUpload = function (dir) {
  /* 生成multiparty对象，并配置上传目标路径 */
  const form = new multiparty.Form();
  // 设置编码
  form.encoding = 'utf-8';
  // 设置文件存储路径，以当前编辑的文件为相对路径
  form.uploadDir = dir;
  // 设置文件大小限制
  form.maxFilesSize = 100 * 1024 * 1024;
  return form;
};

module.exports = {
  createUpload
};