import styled from 'styled-components';
import tw from 'twin.macro';
import { FiMoreHorizontal } from 'react-icons/fi';

export const ChatMsg = styled.div`
  ${tw`flex items-end my-5`}
`;

export const ChatMsgTextWrapper = styled.div`
  ${tw`relative flex items-center`}
  width: fit-content;
`;

export const ChatMsgText = styled.div`
  ${tw`relative rounded-2xl px-3 py-2 max-w-[70%]`}
`;

export const ChatMsgTextTail = styled.div`
  ${tw`absolute w-[30px] h-[30px] rounded-full`}
  &:before {
    ${tw`bg-dark`}
  }
`;

export const ChatMsgMoreIcon = styled(FiMoreHorizontal)`
  ${tw`relative mr-3.5 text-[20px] text-secondary cursor-pointer`}
  visibility: hidden;
`;

export const ChatMsgMoreIconWrapper = styled.div`
  ${tw`relative`}
`;

export const ChatMsgLeft = styled(ChatMsg)`
  ${tw`relative`}

  ${ChatMsgText} {
    ${tw`bg-primary ml-2 rounded-bl-[0]`}
  }
  ${ChatMsgTextTail} {
    ${tw`bg-primary bottom-[-5px] left-[30px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] left-[-28px] bottom-[-3px]`}
      content: '';
  }
`;

export const ChatMsgRight = styled(ChatMsg)`
  ${tw`relative flex-row-reverse`}

  &:hover {
    ${ChatMsgMoreIcon} {
      visibility: visible;
    }
  }

  ${ChatMsgTextWrapper} {
    ${tw`flex flex-row-reverse`}
  }
  ${ChatMsgText} {
    ${tw`bg-darker mr-2 rounded-br-[0] max-w-[75%]`}
  }
  ${ChatMsgTextTail} {
    ${tw`bg-darker bottom-[-5px] right-[-8px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] right-[-28px] bottom-[-3px]`}
      content: '';
    }
  }
`;

export const ChatMsgAvatar = styled.figure`
  ${tw`relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 mb-[-5px] z-10`}
  border: 2px solid black;
`;

// sender: 82E8FF
// receiver: DFE2E2
