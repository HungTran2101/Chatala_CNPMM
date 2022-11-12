const StompServer = require('stomp-broker-js');
const Messages = require('../models/messageModel');
const Rooms = require('../models/roomModel');
const { decodeJWT } = require('../utils/utilFunctions');

const startNotificationServive = server => {
  const stompServer = new StompServer({
    server: server,
    debug: console.log,
    path: '/ws',
    protocol: 'sockjs',
    heartbeat: [0, 0],
  });

  stompServer.subscribe('/server', (data, headers) => {
    data = JSON.parse(data);
    console.log(data);

    const { roomId, msg, files } = req.body;
    const { id } = decodeJWT(req.signedCookies.token);

    const result = Messages.create({
      roomId,
      senderId: id,
      msg,
      files,
    }).then(res => {
      if (result) {
        const lastMsg = msg !== '' ? msg : files[0].name;
        Rooms.findByIdAndUpdate(roomId, { lastMsg }, { new: true }).then(() => {
          Rooms.findOne(roomId).then(room => {
            console.log(room);
            // sendToClients(stompServer,room);
          });
        });
      }
    });
  });

  stompServer.onDisconnect(result => {
    console.log('result', result);
  });
};

module.exports = {
  startNotificationServive,
};

const sendToClient = (stompServer, clientId, roomData, data, isNewRoom) => {
  let Message = {};

  stompServer.send('/user/' + clientId, {}, JSON.stringify(Message));
};

const sendToClients = (stompServer, clientList, roomData, data) => {
  let Message = {};

  clientList.map(client => {
    if (client.userId !== data.senderId) {
      stompServer.send('/user/' + client.userId, {}, JSON.stringify(Message));
    }
  });
};
