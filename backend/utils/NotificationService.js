const StompServer = require('stomp-broker-js');

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
    // console.log(data);

    // check if this is new box by roomId
    if (data.roomId === '') {
      // new private room
    } else {
      if (data.receiverId === '') {
        // group message
      } else {
        // private message
      }
    }
  });

  stompServer.onDisconnect(result => {
    console.log('result', result);
  });
};

module.exports = {
  startNotificationServive,
};

const createRoom = async data => {};

const sendToClient = () => {
  let Message = {};

  stompServer.send('/user/' + clientId, {}, JSON.stringify(Message));
};

const sendToClients = () => {
  let Message = {};

  clientList.map(client => {
    if (client.userId !== data.senderId) {
      stompServer.send('/user/' + client.userId, {}, JSON.stringify(Message));
    }
  });
};
