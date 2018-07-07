const WebSocket       = require('ws')
const http            = require('http')
const amqp            = require('amqplib/callback_api');
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
      latitude: randomFloat(-8.0584999, -8.0484900),
      longitude: randomFloat(-34.9500799, -34.8500700),
      bus: 'Caxanga'
    })
  }, 1000);
})

function randomFloat (low, high) {
  return (Math.random() * (high - low) + low).toFixed(6)
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
  amqp.connect('amqp://45.55.84.196', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'hello';

      ch.assertQueue(q, {durable: false});
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
    })
  })
}
