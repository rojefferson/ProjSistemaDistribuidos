//var connection = new WebSocket('ws://45.55.84.196:8080/bustick')
var connection = new WebSocket('ws://localhost:8080/bustick')

connection.onopen = function() {
  console.log('Connection open!')
}

connection.onclose = function() {
  console.log('Connection closed')
}

var positions = []

connection.onmessage = function(e) {
  var msg = JSON.parse(e.data)

  if (msg.type === 'tick')
    positions.push({lat: msg.latitude, lon: msg.longitude})
}

setInterval(function () {
  var obj = positions.shift()
  moveBus(obj.lat, obj.lon)
}, 500)

//function sendMsg () {
  //connection.send('dale')
//}
