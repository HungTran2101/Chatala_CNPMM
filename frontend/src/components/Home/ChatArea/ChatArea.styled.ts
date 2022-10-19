import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import { FaCircle } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { BsEmojiLaughingFill } from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';
import { zoomIn } from 'react-animations';
export const ChatArea = styled.div`
  ${tw`relative bg-secondary shadow-md rounded-[30px] flex-grow flex flex-col`}
`;

export const ChatAreaHead = styled.div`
  ${tw`relative flex justify-between items-center py-1.5 px-7`}
`;

export const ChatAreaHeadInfo = styled.div`
  ${tw`flex items-center cursor-default`}
`;

export const ChatAreaHeadAvatar = styled.figure`
  ${tw`relative w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;

export const ChatAreaHeadNameWrapper = styled.div`
  ${tw`ml-3.5`}
`;

export const ChatAreaHeadName = styled.div`
  ${tw`font-semibold text-black text-[18px]`}
`;

export const ChatAreaHeadStatus = styled.div`
  ${tw`text-lighter text-[16px] flex items-center gap-1.5`}
`;

export const ChatAreaHeadStatusIcon = styled(FaCircle)<{ status: number }>`
  ${tw`mt-[-2px] text-[12px]`}
  ${({ status }) => (status === 1 ? `color: #04BF00` : `color: #BF0000`)}
`;

export const ChatAreaHeadOption = styled(IoMenu)`
  ${tw`text-[40px] text-lighter hover:cursor-pointer`}
`;

export const ChatAreaMain = styled.div`
  ${tw`flex flex-col flex-grow bg-light px-6 pb-4 pt-0 rounded-[30px]`}
`;

export const ChatAreaMainMsg = styled.div`
  ${tw`flex-grow overflow-y-scroll overflow-x-hidden h-0 mb-3 rounded-3xl pr-1.5 flex flex-col-reverse`}

  &::-webkit-scrollbar-track {
    ${tw`rounded-[10px] bg-transparent`}
  }

  &::-webkit-scrollbar {
    ${tw`w-[5px]`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`rounded-[50px] bg-lighter`}
  }
`;

export const ChatAreaMainMsgInner = styled.div`
  ${tw`flex flex-col-reverse`}
`;

export const ChatChatAreaFilePreview = styled.div`
  ${tw`flex rounded-[10px] pb-1 bg-[#E6E9EA] mb-1.5 overflow-hidden`}
`;

export const ChatChatAreaFilePreviewInner = styled.div`
  ${tw`flex flex-grow p-2 pt-3.5 w-0 overflow-x-auto pb-2 z-0`}

  &::-webkit-scrollbar-track {
    ${tw`rounded-[10px] bg-transparent`}
  }

  &::-webkit-scrollbar {
    ${tw`h-[5px]`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`rounded-[50px] bg-light`}
  }
  &::-webkit-scrollbar-thumb:hover {
    ${tw`bg-lighter`}
  }
`;

export const ChatAreaMainInput = styled.div`
  ${tw`relative flex items-center`}
`;

export const ChatAreaMainInputFile = styled.label`
  ${tw`flex flex-shrink-0 shadow text-lighter bg-primary rounded-full w-12 h-12 items-center justify-center text-4xl hover:cursor-pointer hover:opacity-80`}
`;

export const ChatAreaMainInputMsg = styled.div`
  ${tw`flex flex-grow shadow items-center p-1.5 bg-[#DFE2E2] ml-2.5 rounded-[20px] relative`}
`;

export const ChatAreaMainInputEmoji = styled(BsEmojiLaughingFill)`
  ${tw`text-lighter text-4xl hover:cursor-pointer hover:text-[#003BD2] transition-colors`}
`;

const ZoomInAnimation = keyframes`${zoomIn}`;

export const ChatAreaMainInputEmojiPicker = styled.div`
  ${tw`absolute rounded-[30px] overflow-hidden`}
  border: 2px solid gray;
  transform: translate(55px, -230px);
  animation: 0.1s ${ZoomInAnimation};
`;

export const ChatAreaMainInputText = styled.span<{ username: string }>`
  ${tw`flex-grow outline-none bg-transparent text-xl ml-2.5 w-1 overflow-auto max-h-24 whitespace-normal hover:cursor-text`}

  &:empty::before {
    content: 'Write something to ${({ username }) => username}...';
    ${tw`cursor-text text-gray-400`}
  }
  &::-webkit-scrollbar-track {
    ${tw`rounded-[10px] bg-transparent`}
  }

  &::-webkit-scrollbar {
    ${tw`w-[2px]`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`rounded-[50px] bg-lighter`}
  }
`;

export const ChatAreaMainInputButtonSend = styled.button`
  ${tw`bg-lighter text-primary hover:text-secondary p-2 rounded-full ml-2.5 outline-none`}
`;

export const ChatAreaMainInputSendIcon = styled(RiSendPlaneFill)`
  ${tw`text-[20px]`}
`;
