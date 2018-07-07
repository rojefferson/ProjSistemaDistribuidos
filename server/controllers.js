const WebSocket       = require('ws')
const http            = require('http')
const WebSocketServer = WebSocket.Server

wss = new WebSocketServer({port: 8080, path: '/bustick'})
wss.on('connection', function(ws) {

  ws.on('message', function(message) {
    console.log('msg chegou')
    broadCast(wss, ws, message)
  })

  broadCast(wss, ws, 'Someone joined the server!')

  setInterval(function() {
    broadCast(wss, ws, {
      type: 'tick',
      latitude: randomInt(0, 100),
      longitude: randomInt(0, 100),
      bus: 'Caxanga'
    })
  }, 1000);
})

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

function broadCast (wss, ws, message) {
  console.log('broadcasting', message)
  wss.clients.forEach(function (client) {

    if (client.readyState === WebSocket.OPEN)
      client.send(JSON.stringify(message))
  })
}

exports.index = function (req, res) {
  res.render('index');
}

exports.tick = function (req, res) {
  res.send('ok')
}
