import { useOutsideClick } from '../../../../Global/ProcessFunctions';
import * as S from './ChatMsgOption.styled';

interface IChatMsgOption {
  setToggleOption: (toogle: boolean) => void;
}

const ChatMsgOption = ({ setToggleOption }: IChatMsgOption) => {
  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const chatMsgOptionRef = useOutsideClick(handleOutsideClick);

  return (
    <S.ChatMsgOption ref={chatMsgOptionRef}>
      <S.NormalItem>Unsend</S.NormalItem>
    </S.ChatMsgOption>
  );
};

export default ChatMsgOption;
