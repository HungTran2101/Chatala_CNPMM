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
    if (data.roomId === '' || data.roomId === 'tempRoomId') {
      // new private room
    } else {
      if (data.receiverName === '') {
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
