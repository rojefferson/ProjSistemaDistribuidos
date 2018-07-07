const amqp = require('amqplib/callback_api')
const fs = require('fs')


//amqp.connect('amqp://guest:guest@45.55.84.196', function(err, conn) {
amqp.connect('amqp://localhost', function(err, conn) {

    if (err)
      return console.trace(err)


  conn.createChannel(function(err, ch) {

    var lineReader = require('readline').createInterface({
      //input: require('fs').createReadStream('../amostra-tratada.csv')
      input: require('fs').createReadStream('../bus.csv')
    });

    lineReader.on('line', function (line) {
      var lineArr = line.split(';')

        lineArr = lineArr.slice(0, 8)

        var q = 'hello';
        var msg = 'Hello World!';

        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        //
        ch.sendToQueue(q, new Buffer(lineArr.join(',')));
        console.log(" [x] Sent %s", msg);
      });
  });
});
