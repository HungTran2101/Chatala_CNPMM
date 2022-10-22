import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { merge, zoomIn, slideInRight, slideInDown } from "react-animations";

export const NotiModal = styled.div`
  ${tw`fixed top-0 left-0 bottom-0 right-0 z-30`}
`;

export const NotiOverlay = styled.div`
  ${tw`absolute bg-[#00000080] h-full w-full`}
`;

const cbAnimate1 = merge(slideInRight, slideInDown)
const NotiAnimate = keyframes`${merge(zoomIn, cbAnimate1)}`;

export const Noti = styled.div`
  ${tw`bg-[#7199BA] flex flex-col py-2.5 px-3.5 rounded-[25px] absolute shadow-md right-[170px] top-[35px] z-10`}
  animation: 0.2s ${NotiAnimate};
  border: 2px solid #ecf2f7;
`;

export const NotiTitles = styled.div`
  ${tw`rounded-[50px] text-gray-600 text-lg font-semibold bg-[#AAC4FF] px-8 py-1.5 mb-1.5`}
  text-shadow: 0 0 5px #AAC4FF;
  width: fit-content;
`;

export const NotiList = styled.div`
  ${tw``}
`;

export const NotiItem = styled.div`
  ${tw`flex p-2 rounded-[50px] my-1.5 items-center relative w-full bg-[#AAC4FF]`}
`;

export const NotiInfo = styled.div`
  ${tw`flex items-center hover:cursor-pointer`}
`;

export const NotiAvatar = styled.figure`
  ${tw`relative w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;
export const NotiNameWrapper = styled.div`
  ${tw`ml-3.5`}
`;

export const NotiName = styled.div`
  ${tw`font-semibold text-[18px] w-[175px]`}
`;

export const NotiNumFriend = styled.div`
  ${tw`text-[#434343] text-[16px]`}
`;

export const NotiOption = styled.div`
  ${tw`text-white rounded-[50px] font-semibold text-sm px-5 py-2.5 ml-1 hover:cursor-pointer hover:opacity-80`}
`;

export const NotiAccept = styled(NotiOption)`
  ${tw`bg-[#2374E1]`}
`;

export const NotiCancel = styled(NotiOption)`
  ${tw`bg-[#4E4F50]`}
`;
