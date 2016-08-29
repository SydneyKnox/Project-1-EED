var socket = io();        
      
      var y1 = [1,2],
          x1 = [1,2];              
        
      var data = [
      {
        x:x1,
        y:y1,
        type: 'scatter'
      }];

      var layout = {
        title: 'Temperature',
        xaxis: {
            title: 'time (ms)'
        },
        yaxis: {
            title: 'Temperature (F)'
        }
      };
          
      Plotly.newPlot('myDiv',data);
      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      
      socket.on('chat message', function(msg){
        $('#messages').html(msg);
        y1.push(1);
        x1.push(msg);
        Plotly.redraw('myDiv', data);
      });