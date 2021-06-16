const createGoodsList = function (number = 8) {
  const arr = [];
  for (let i = 1; i <= number; i++) {
    arr.push({
      id: i,
      name: 'goods-' + i,
      price: i
    })
  }
  return arr;
};

module.exports = createGoodsList;