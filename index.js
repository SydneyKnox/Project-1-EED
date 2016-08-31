/*********************************************************************************************************************
* These sites provided examples from which the basic setup of this system is set up.
* http://socket.io/get-started/chat/
* https://www.twilio.com/blog/2013/08/verify-phone-numbers-with-node-js-using-twilio-sms-express-and-socket-io.html
* https://www.twilio.com/docs/libraries/node 
*********************************************************************************************************************/

var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var client = require('twilio')('ACdf8fc40465838045551ebf9fe50c26e7', '0afe043f0a0d55fc7d4f627cd170d996');
var SerialPort = require('serialport');
var sf= require('sf');

// SerialPort.list(function(err,results){
    // if(err){
        // throw err;
    // }
    
    // for(var i=0; i<results.length;i++){
        // var item=results[i];
        // console.log(sf('{comName,-15}{pnpId,-20}{manufacturer}',item));
    // }
// });

var port = new SerialPort('COM3', {
    baudRate: 57600
    //change baud rate determined by arduino
});

SerialPort.list(function(err, ports){
    console.log("in ports");
    ports.forEach(function(port){
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
});

port.on('error', function(err){
    console.log('Error: ', err.message);
});

port.on('data', function(data) {
    console.log('Data: ' + data);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('textNow', function(temp, phone_number, maxVal, minVal){
      console.log('in textNow');
      console.log('temp: ' + temp + ' num: ' + phone_number);
      console.log('minVal: ' + minVal + ' maxVal: ' + maxVal);
      
      if(temp < minVal)
      {
          console.log('in < minVal');
          // client.sendSms({
              // to: phone_number,
              // from: '+13194096407',
              // body: temp + ' degrees C is less than min Val'
          // });
      } else if(temp > maxVal){
         console.log('in > maxVal');
         // client.sendSms({
              // to: phone_number,
              // from: '+13194096407',
              // body: temp + ' degrees C is more than Val'
          // }); 
      } else {
          console.log('inrange');
          // client.sendSms({
              // to: phone_number,
              // from: '+13194096407',
              // body: temp + ' degrees C is in range'
          // });
      }
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});