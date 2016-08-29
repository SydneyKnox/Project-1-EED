var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var client = require('twilio')('ACdf8fc40465838045551ebf9fe50c26e7', '0afe043f0a0d55fc7d4f627cd170d996');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('textNow', function(temp, phone_number){
      console.log('in textNow');
      console.log('temp: ' + temp + ' num: ' + phone_number);
      //client.sendSms({
      //    to: phone_number,
      //    from: '+13194096407',
     //     body: temp + ' degrees C'
     // });
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});