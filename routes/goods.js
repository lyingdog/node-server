const express = require('express');
const createGoods = require('../data/create-goods');
const router = express.Router();

let goodsPageList = createGoods(999);

/* goods router */
router
  .get('/', function(req, res, next) {
     const { pageNum = 1, pageSize = 10 } = req.query;
     const count = goodsPageList.length; // 数据总量
     const allPage = Math.ceil(count / pageSize); // 总共几页
     const hasNextPage = allPage > pageNum; // 是否有下一页
     const start = (pageNum - 1) * pageSize;
     const end = pageNum * pageSize;
     const list = goodsPageList.slice(start, end);
     res.json({
       code: 0,
       data: {
         list,
         hasNextPage,
         pages: allPage,
         count
       },
       msg: '操作成功'
     })
  })
  .post('/', function (req, res) {
    const g = req.body;
    goodsPageList.unshift(g);
    res.json({
      code: 0,
      data: null,
      msg: '操作成功'
    });
  })
  .put('/:id', function (req, res) {
    const g = req.body;
    const id = +req.params.id;
    console.log('id', id);
    goodsPageList = goodsPageList.map(v => {
      if (v.id === id) {
        return g;
      }
      return v;
    });
    res.json({
      code: 0,
      data: null,
      msg: '操作成功'
    });
  })
  .delete('/:id', function(req, res) {
    const id = +req.params.id;
    console.log('id', id);
    goodsPageList = goodsPageList.filter(v => v.id !== id);
    res.json({
      code: 0,
      data: null,
      msg: '操作成功'
    });
  });

module.exports = router;
