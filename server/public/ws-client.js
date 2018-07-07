var connection = new WebSocket('ws://45.55.84.196:8080/bustick')

connection.onopen = function() {
  console.log('Connection open!')
}

connection.onclose = function() {
  console.log('Connection closed')
}

connection.onmessage = function(e) {
  var msg = JSON.parse(e.data)

    console.log(msg)
  if (msg.type === 'tick')
    moveBus(msg.latitude, msg.longitude)
}

//function sendMsg () {
  //connection.send('dale')
//}
