import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './ChatList.styled';
import React from 'react';
import { useGlobalContext } from '../../../../contexts/globalContext';
import {
  ChatListArray,
  ChatMsgArray,
  UserAvatar,
} from '../../../../utils/dataConfig';

interface IChatList {
  selected: number;
  setSelected: (num: number) => void;
}

const ChatList = ({ selected, setSelected }: IChatList) => {
  const context = useGlobalContext();

  const roomSelect = (index: number) => {
    context.setRoomMsg(ChatMsgArray[index]);
    context.setRoomInfo({
      roomName: index % 2 === 0 ? '' : 'Group Chat',
      isGroup: index % 2 === 0 ? false : true,
      users: [
        { avatar: UserAvatar, role: false, name: 'Ng Van A' },
        { avatar: UserAvatar, role: true, name: 'Ng Van B' },
      ],
    });
  };

  return (
    <S.ChatList>
      <S.Wrapper>
        {ChatListArray.map((data, index) => (
          <React.Fragment key={index}>
            <ChatPreviewItem
              avatar={UserAvatar}
              msg={data.msg}
              name={data.name}
              id={index}
              active={selected === index}
              setSelected={setSelected}
              onClick={() => roomSelect(index)}
            />
          </React.Fragment>
        ))}
      </S.Wrapper>
    </S.ChatList>
  );
};

export default ChatList;
