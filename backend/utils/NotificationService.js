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

const sendMessageToClients = (room, result, _senderId) => {
  const temp2 = result.toJSON();
  const { senderId, ...rest } = temp2;
  const temp = { fromSender: false, ...rest };
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
