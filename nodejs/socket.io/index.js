'use strict';

let log = console.log

const constants = require('./Constants')
const fs = require('fs')

// 定义客户
let clients = {}

function clientsLength() {
  return Object.keys(clients).length
}

function addClient(id) {
  clients[id] = {}
}

function delClient(id) {
  delete clients[id];
}

// 事件处理函数
function handleRequestFile(socket, path) {
  fs.readFile('demo.txt', 'utf8', function (err, data) {
    if (err) {
      return console.error(err)
    }
    else {
      socket.emit(constants.EVENT_SEND_FILE, data)
    }
  });
}


function useIO() {
  var io = require('socket.io').listen(constants.SERVER_PORT)

  function handleError(error) {
    console.log('handleError: ')
    console.log(error)
  }

  // 连接成功后调用
  function handleConnect(socket) {
    console.log('connected! ')

    let socketID = socket.id

    addClient(socketID)

    let welcomeMessage = '[Welcome ' + socketID +' !!] Num: (' + clientsLength() + ')'
    socket.send(welcomeMessage)
  }

  // 广播消息
  function broadcastMessage(socket, message, toSender) {
    if (toSender) {
      socket.emit('message', message)
    }
    socket.broadcast.emit('message', message)
  }

  io.on('connection', function (socket) {

    handleConnect(socket)

    let socketID = socket.id

    socket.on('message', function() {
      // socket.emit('message', 'echo ' + arguments[0])
      // socket.broadcast.emit('message', 'echo: ' + arguments[0])
      broadcastMessage(socket, 'echo ' + arguments[0], true)
      console.log(arguments);
    })

    socket.on('disconnect', function() {
      delClient(socketID)
      let message = 'client [' + socketID + '] disconnect!! Num: (' + clientsLength() + ')'

      broadcastMessage(socket, message, false)

      console.log(message)
    })

    socket.on('error', handleError)

    socket.on(constants.EVENT_REQUEST_FILE, function(){
      handleRequestFile(socket, 'demo.txt')
    })
  })

  log('server ready!')

  return io;
}

function useRoom(io, roomName) {
  let room;

  if (!io) {
    console.log("io is null");
    return;
  }

  if (!roomName) {
    console.log("roomName is null");
    return;
  }

  room = io.of(roomName)

  console.log(`useRoom ${roomName} ${!!room}`)
  return room;
}

function useRoom01(room) {
  if (!room) {
    console.log("room is null")
    return;
  }

  room.on("connection", (socket) => {
    socket.emit('a message', {
      that: 'only'
    , '/chat': 'will get'
    });

    room.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });


    socket.on("a message", (data) => {
      room.emit("a message", "server !");
      console.log("a message:", data);
    });
  });


  // room.emit('a message', {"k1": "value1"});
  // room.emit('a message', "data data");
}

(function() {
  let io = useIO();

  let room01 = useRoom(io, "room01");
  useRoom01(room01);

})()
