const amqp = require('amqplib/callback_api')
const fs = require('fs')


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./tratado.csv')
    });

    lineReader.on('line', function (line) {
      var lineArr = line.split(';')
      console.log(lineArr[0], lineArr[1], lineArr[2], lineArr[3])

        var q = 'hello';
        var msg = 'Hello World!';

        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        //
        ch.sendToQueue(q, new Buffer(lineArr));
        console.log(" [x] Sent %s", msg);
      });
  });
});
