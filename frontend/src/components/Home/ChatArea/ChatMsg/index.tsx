import Image from 'next/image';
import { useState } from 'react';
import { UserAvatar } from '../../../../utils/dataConfig';
import * as S from './ChatMsg.styled';
import ChatMsgOption from './ChatMsgOption';

interface IChatMsg {
  msg: String;
  index: number;
}

const ChatMsg = ({ msg, index }: IChatMsg) => {
  const [toggleOption, setToggleOption] = useState(false);

  return index % 2 === 0 ? (
    <S.ChatMsgLeft>
      <S.ChatMsgAvatar>
        <Image
          src={UserAvatar}
          alt='avatar'
          layout='fill'
          objectFit='contain'
        />
      </S.ChatMsgAvatar>
      <S.ChatMsgTextTail />
      <S.ChatMsgText>{msg}</S.ChatMsgText>
    </S.ChatMsgLeft>
  ) : (
    <S.ChatMsgRight>
      <S.ChatMsgTextTail />
      <S.ChatMsgTextWrapper>
        <S.ChatMsgText>{msg}</S.ChatMsgText>
        <S.ChatMsgMoreIconWrapper>
          <S.ChatMsgMoreIcon onClick={() => setToggleOption(true)} />
          {toggleOption && <ChatMsgOption setToggleOption={setToggleOption} />}
        </S.ChatMsgMoreIconWrapper>
      </S.ChatMsgTextWrapper>
    </S.ChatMsgRight>
  );
};

export default ChatMsg;
