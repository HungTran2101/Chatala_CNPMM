import ChatArea from '../src/components/Home/ChatArea';
import * as S from '../src/components/Home/Home.styled';
import SideBar from '../src/components/Home/SideBar';
import TopBar from '../src/components/Home/TopBar';
import Welcome from '../src/components/Home/Welcome';
import { useGlobalContext } from '../src/contexts/globalContext';
import { RoomApi } from '../src/services/api/room';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { BASEURL } from '../src/services/api/urls';
import { roomInfo } from '../src/utils/types';
const Stomp = require('stompjs');

const Home = () => {
  const context = useGlobalContext();

  const [listMessage, setListMessage] = useState<any>(context.roomMsg);

  const [room, setRoom] = useState<roomInfo>(context.roomInfo);

  const [userId, setUserId] = useState<any>('');

  const getRoomData = async () => {
    try {
      const rooms = await RoomApi.getRoomList();
      context.setRoomList(rooms.result);
    } catch (err) {
      console.log(err);
    }
  };

  const connectServer = () => {
    let Sock = new SockJS(BASEURL + '/ws');
    let stompClient = Stomp.over(Sock);
    stompClient.debug = null;
    stompClient.heartbeat = 0;
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe('/user/' + userId, (message: any) =>
          onPrivateMessage(message)
        );
      },
      () => {
        alert('disconnected from server');
      }
    );
  };

  const onPrivateMessage = (message: any) => {
    message.body.replace('\\', '');

    const newMessage = JSON.parse(message.body);

    const newRoom = room;

    newRoom.roomInfo.lastMsg = {
      text: newMessage.msg,
      senderId: newMessage.senderId,
    };

    setRoom(newRoom);

    setListMessage((listMessage: any) => [newMessage, ...listMessage]);
  };

  useEffect(() => {
    context.setRoomList(
      context.roomList.map(index =>
        index.roomInfo._id === room.roomInfo._id ? room : index
      )
    );
  }, [room?.roomInfo?.lastMsg?.text]);

  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
    getRoomData();
  }, []);

  useEffect(() => {
    if (userId !== '') {
      connectServer();
    }
  }, [userId]);

  return (
    <>
      <S.HomeContainer>
        <TopBar />
        <S.Wrapper>
          <SideBar />
          {context.roomChoosen ? (
            <ChatArea
              listMessage={listMessage}
              setListMessage={setListMessage}
              room={room}
              setRoom={setRoom}
            />
          ) : (
            <Welcome />
          )}
        </S.Wrapper>
      </S.HomeContainer>
    </>
  );
};

export default Home;
