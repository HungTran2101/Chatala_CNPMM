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

const sendToClients = (room, message, senderId) => {
  room.users.map(client => {
    if (client.uid !== senderId) {
      stompServer.send('/user/' + client.userId, {}, JSON.stringify(message));
    }
  });
};

module.exports = {
  startNotificationServive,
  sendToClients,
};
