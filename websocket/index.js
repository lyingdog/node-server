const ws = require('nodejs-websocket');

const createServer = () => {
  return ws.createServer(connection => {
    connection.timeStamp = Date.now();
    // console.log('create conn', connection);
    console.log('有新的连接');
    connection.on('text', (result) => {
      const data = JSON.parse(result)
      console.log('收到消息111', data);
    })
    connection.on('connect', (code) => {
      console.log('开启连接', code)
    })
    connection.on('close', (code) => {
      console.log('关闭连接', code)
      clearInterval(timer)
    })
    connection.on('error', (code) => {
      console.log('异常关闭', code)
      clearInterval(timer)
    })

    // 定时发消息
    const timer = setInterval(() => {
      connection.send('1111')
    }, 3000)
  })
}

const server = createServer();

module.exports = {
  websocket: server
};