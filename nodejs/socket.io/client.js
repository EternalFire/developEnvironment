'use strict';

const constants = require('./Constants')
const fs = require('fs')

const uri = constants.ADDRESS_FOR_CLIENT

const io = require('socket.io-client')
const socket = io(uri)

function handleSendFile(data) {
  console.log('handleSendFile: ')
  console.log(data)
  saveToFile('demo__omed.txt', data)
}

function saveToFile(name, data) {
  fs.writeFile(name, data, (err) => {
    if (err) {

      throw err;
    }

    console.log('File saved!')
  })
}

socket.on('connect', () => {

  console.log('client: ', socket.id, ' connected!');

  socket.on('message', (data)=>{
    console.log('message:', data);
  });

  // setInterval(function(){
  //   socket.emit('message', 'message from ' + socket.id)
  // },2000);

  // socket.on(constants.EVENT_SEND_FILE, handleSendFile)

  // socket.emit(constants.EVENT_REQUEST_FILE)
  //

  // setTimeout(function () {
  //   socket.emit('closeServer');
  //   socket.disconnect(true);
  // }, 2000);

  setTimeout(function() {
    room01();
  }, 1000);
});

// test room01
function room01() {
  const room01 = io(`${uri}/room01`);
  room01.on("connect", () => {
    setInterval(function(){
      room01.emit('a message', 'room01 message from ' + room01.id)
    }, 1000);

  });

  room01.on('a message', function (a0) {
    var args = Array.prototype.splice.call(arguments, 0);

    console.log(room01.id, `a message  arguments:`, args)
    // console.log(a0);

  });
}