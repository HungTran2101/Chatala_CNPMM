import styled from 'styled-components';
import tw from 'twin.macro';
import { FiMoreHorizontal } from 'react-icons/fi';

export const ChatMsg = styled.div`
  ${tw`flex items-end mb-1`}
`;

export const ChatMsgText = styled.div`
  ${tw`relative px-3 py-2 shadow-md`}
`;

export const ChatMsgTextTail = styled.div`
  ${tw`absolute w-[30px] h-[30px] rounded-full`}
  &:before {
    ${tw`bg-dark`}
  }
`;

export const ChatMsgAvatar = styled.figure<{ position: string }>`
  ${tw`relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 mb-[-5px] z-10 invisible`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`visible`}
  border: 1px solid gray;
`;

export const ChatMsgMoreIcon = styled(FiMoreHorizontal)<{ nomsg?: number }>`
  ${tw`relative mr-3.5 text-[20px] text-gray-600 cursor-pointer invisible`}
`;

export const ChatMsgMoreIconWrapper = styled.div<{ nomsg?: number }>`
  ${tw`relative`}
  ${({ nomsg }) => nomsg && tw`absolute right-[410px]`}
`;

export const ChatMsgTextWrapper = styled.div`
  ${tw`relative flex items-center w-full`}
`;

export const ChatMsgFileImages = styled.div<{ imgNum: number }>`
  ${tw`relative grid w-[400px] gap-1 mt-1`}
  ${({ imgNum }) =>
    imgNum === 1
      ? tw`grid-cols-1`
      : imgNum === 2
      ? tw`grid-cols-2`
      : imgNum >= 3 && tw`grid-cols-3`}
`;

export const ChatMsgFileImage = styled.figure<{ imgNum: number }>`
  ${tw`relative rounded-[5px] w-full mx-0.5 hover:cursor-pointer overflow-hidden shadow-md`}
`;

export const ChatMsgFiles = styled.div`
  ${tw`flex flex-col w-[220px]`}
`;

export const ChatMsgFileIcon = styled.div`
  ${tw`flex items-center justify-center p-1.5 bg-secondary rounded-full`}
`;

export const ChatMsgFileName = styled.div`
  ${tw`ml-1.5 overflow-hidden text-[16px] font-semibold text-darker`}
`;

export const ChatMsgFile = styled.div`
  ${tw`relative flex items-center mt-1 mx-2 h-[50px] pl-1.5 pr-3.5 py-1 bg-primary rounded-[10px] shadow-md`}
`;

export const ChatMsgUnSend = styled.div`
  ${tw`border-2 py-2 px-2.5`}
  width: fit-content;
`;

export const ChatMsgWrapper = styled.div`
  ${tw`flex flex-col max-w-[70%]`}
  width: fit-content;
`;

export const ChatMsgLeft = styled(ChatMsg)<{ position: string }>`
  ${tw`relative`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`mb-7`}

  ${ChatMsgUnSend} {
    ${tw`ml-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-bl-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-bl-none`
        : tw`rounded-r-2xl`}
  }
  ${ChatMsgText} {
    ${tw`bg-primary ml-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-bl-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-bl-none`
        : tw`rounded-r-2xl`}
  }
  ${ChatMsgFileImages} {
    ${tw`ml-1.5`}
  }
  ${ChatMsgTextTail} {
    ${({ position }) =>
      position !== 'bottom' && position !== 'alone' && tw`invisible`}
    ${tw`bg-primary bottom-[-5px] left-[31px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] left-[-28px] bottom-[-3px]`}
      content: '';
  }
`;

export const ChatMsgRight = styled(ChatMsg)<{ position: string }>`
  ${tw`relative flex-row-reverse items-center`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`mb-7`}

  ${ChatMsgUnSend} {
    ${tw`mr-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-br-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-br-none`
        : tw`rounded-l-2xl`}
  }
  ${ChatMsgTextWrapper} {
    ${tw`flex flex-row-reverse`}
  }
  ${ChatMsgText} {
    ${tw`bg-darker mr-2 rounded-br-[0]`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-br-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-br-none`
        : tw`rounded-l-2xl`}
  }
  ${ChatMsgTextTail} {
    ${({ position }) =>
      position !== 'bottom' && position !== 'alone' && tw`invisible`}
    ${tw`bg-darker bottom-[-5px] right-[-8px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] right-[-28px] bottom-[-3px]`}
      content: '';
    }
  }
  ${ChatMsgWrapper} {
    ${tw`items-end`}
  }
  ${ChatMsgFileImages} {
    ${tw`mr-2.5`}
  }

  &:hover {
    ${ChatMsgMoreIcon} {
      visibility: visible;
    }
  }
`;

// sender: 82E8FF
// receiver: DFE2E2
