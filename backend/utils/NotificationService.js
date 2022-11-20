const StompServer = require('stomp-broker-js');
const User = require('../models/userModel');

let stompServer;

const startNotificationServive = server => {
  stompServer = new StompServer({
    server: server,
    debug: console.log,
    path: '/ws',
    protocol: 'sockjs',
    heartbeat: [0, 0],
  });
};

const sendMessageToClients = (room, result, _senderId) => {
  const temp2 = result.toJSON();
  const temp = { fromSender: false, ...temp2 };
  room.users.map(client => {
    if (client.uid.toString() !== _senderId.toString()) {
      stompServer.send('/user/' + client.uid, {}, JSON.stringify(temp));
    }
  });
};

module.exports = {
  startNotificationServive,
  sendMessageToClients,
};
