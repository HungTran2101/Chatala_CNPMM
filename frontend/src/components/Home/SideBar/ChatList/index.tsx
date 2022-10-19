import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './ChatList.styled';
import React from 'react';
import { useGlobalContext } from '../../../../contexts/globalContext';
import { ChatListArray, ChatMsgArray } from '../../../../utils/dataConfig';

interface IChatList {
  selected: number;
  setSelected: (num: number) => void;
}

const ChatList = ({ selected, setSelected }: IChatList) => {
  const context = useGlobalContext();

  const roomSelect = (index: number) => {
    context.setRoomMsg(ChatMsgArray[index]);
  };

  return (
    <S.Wrapper>
      {ChatListArray.map((data, index) => (
        <React.Fragment key={index}>
          <ChatPreviewItem
            avatar={data.avatar}
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
  );
};

export default ChatList;
