var express = require('express');
var server = express();
var path = require('path');
var bodyParser = require('body-parser');
var gpio = require('pi-gpio');
var value = 1;

server.use(bodyParser.json());

server.use('/', express.static(path.join(__dirname, '/build')));
server.use('/assets', express.static(path.join(__dirname, '/assets')));
server.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
    
setInterval(function() {
    gpio.write(15, value, function() {
        value = (value === 1 ? 0 : 1);
    });
}, 1000);

var gpioFunc = function(pin,set){
  gpio.open(pin, "output", function(err) {   // Open pin 16 for output
    gpio.write(pin, set, function() {      // Set pin 16 high (1)
    gpio.close(pin);           // Close pin 16
    });
  });
}




server.post('/move', function(req, res) {
  if(req.body.direction === 'up'){
    console.log(req.body.direction)

    gpioFunc(13, 1);
    gpioFunc(15, 0);
    gpioFunc(19, 1);
    gpioFunc(21, 0);

    gpioFunc(16, 1);
    gpioFunc(18, 0);
    gpioFunc(36, 1);
    gpioFunc(38, 0);


  }else if(req.body.direction === 'down'){
    console.log(req.body.direction)

    gpioFunc(13, 0);
    gpioFunc(15, 1);
    gpioFunc(19, 0);
    gpioFunc(21, 1);

    gpioFunc(16, 0);
    gpioFunc(18, 1);
    gpioFunc(36, 0);
    gpioFunc(38, 1);


  }else if(req.body.direction === 'left'){
    console.log(req.body.direction)

    gpioFunc(13, 0);
    gpioFunc(15, 1);
    gpioFunc(19, 0);
    gpioFunc(21, 1);

    gpioFunc(16, 1);
    gpioFunc(18, 0);
    gpioFunc(36, 1);
    gpioFunc(38, 0);


  }else if(req.body.direction === 'right'){
    console.log(req.body.direction)

    gpioFunc(13, 1);
    gpioFunc(15, 0);
    gpioFunc(19, 1);
    gpioFunc(21, 0);

    gpioFunc(16, 0);
    gpioFunc(18, 1);
    gpioFunc(36, 0);
    gpioFunc(38, 1);

  }else if(req.body.direction === 'enable'){
    console.log(req.body.direction)
    gpioFunc(23, 1);
  }else if(req.body.direction === 'disable'){
    console.log(req.body.direction)
    gpioFunc(23, 0);
  }

  res.send('200');
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('listening on port', port);

module.exports = server;
