var connection = new WebSocket('ws://localhost:8080/bustick')

connection.onopen = function() {
  console.log('Connection open!')
}

connection.onclose = function() {
  console.log('Connection closed')
}

connection.onmessage = function(e) {
  var msg = JSON.parse(e.data)
  if (msg.type === 'tick')
    moveBus(tick.latitude, tick.longitude)
}

//function sendMsg () {
  //connection.send('dale')
//}
