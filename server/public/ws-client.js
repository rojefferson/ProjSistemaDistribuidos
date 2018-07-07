var connection = new WebSocket('ws://localhost:8080/testing')

connection.onopen = function() {
  console.log('Connection open!')
}

connection.onclose = function() {
  console.log('Connection closed')
}

connection.onmessage = function(e) {
  var tick = JSON.parse(e.data)

  if (!tick.tick)
    return

  moveBus(tick.latitude, tick.longitude)
}

console.log(connection)

function sendMsg () {
  connection.send('dale')
}
