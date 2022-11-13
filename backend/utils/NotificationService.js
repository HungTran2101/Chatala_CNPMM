const StompServer = require('stomp-broker-js');

let stompServer;

const startNotificationServive = server => {
  stompServer = new StompServer({
    server: server,
    debug: console.log,
    path: '/ws',
    protocol: 'sockjs',
    heartbeat: [0, 0],
  });

  stompServer.subscribe('/server', (data, headers) => {
    data = JSON.parse(data);
    console.log(data);
  });

  stompServer.onDisconnect(result => {
    console.log('result', result);
  });
};

const sendToClients = (room, result, senderId) => {
  result.fromSender = false;
  delete result.senderId;
  room.users.map(client => {
    if (client.uid.toString() !== senderId.toString()) {
      stompServer.send('/user/' + client.uid, {}, JSON.stringify(result));
    }
  });
};

module.exports = {
  startNotificationServive,
  sendToClients,
};
