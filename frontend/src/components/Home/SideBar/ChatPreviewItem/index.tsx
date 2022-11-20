import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as S from './ChatPreviewItem.styled';

interface IChatPreviewItem {
  avatar?: string;
  active: boolean;
  msg: { text: string; senderId: string };
  name?: string;
  id: number;
  setSelected: (id: number) => void;
  onClick: () => void;
}

const ChatPreviewItem = ({
  avatar,
  msg,
  name = 'Chat Bot',
  active,
  id,
  setSelected,
  onClick,
}: IChatPreviewItem) => {
  const [userId, setUserId] = useState<string | null>('');
  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
  }, []);

  return (
    <S.ChatPreviewItem active={active} Id={id} onClick={onClick}>
      <S.Wrapper onClick={() => setSelected(id)}>
        {avatar ? (
          <S.ChatAvatar>
            <Image
              src={avatar}
              alt='avatar'
              layout='fill'
              objectFit='contain'
            />
          </S.ChatAvatar>
        ) : (
          <S.ChatBotAvatar />
        )}
        <S.Content>
          <S.Name>{name}</S.Name>
          <S.Msg>
            {msg.senderId == userId ? 'Bạn: ' + msg.text : msg.text}
          </S.Msg>
        </S.Content>
      </S.Wrapper>
    </S.ChatPreviewItem>
  );
};

export default ChatPreviewItem;
