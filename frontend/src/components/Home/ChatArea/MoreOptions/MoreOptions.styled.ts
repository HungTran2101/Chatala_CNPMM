import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { merge, zoomIn, slideInRight, slideInDown } from "react-animations";
import { AiOutlineEdit } from "react-icons/ai";

const cbAnimate1 = merge(slideInRight, slideInDown);
const MoreOptionAnimate = keyframes`${slideInRight}`;

export const MoreOptions = styled.div`
  ${tw`bg-blue-50 absolute rounded-[20px] shadow-md z-30 right-[0px] h-full w-[350px]`}
  animation: 0.3s ${MoreOptionAnimate};
`;

export const RoomInfo = styled.div`
${tw`flex flex-col items-center bg-secondary rounded-[20px] mb-3`}
`

export const RoomInfoTitle = styled.div`
${tw`font-semibold py-3 text-[22px] border-b-[1px] w-full text-center border-b-darker`}
`

export const RoomInfoAvatar = styled.figure`
${tw`relative w-[60px] h-[60px] rounded-full overflow-hidden my-4 border-2 border-darker`}
`

export const RoomInfoName = styled.div`
${tw`relative flex items-center text-[20px] font-semibold mb-4`}
`

export const RoomInfoNameEditIcon = styled(AiOutlineEdit)`
${tw`absolute right[-30px] bg-dark rounded-full p-[2px] text-[23px] hover:cursor-pointer hover:opacity-80`}
`

export const optionItem = styled.div<{ color?: string }>`
  ${tw`text-sm px-3 py-2 rounded-[20px] cursor-pointer`}
`;

export const NormalItem = styled(optionItem)`
  ${tw`hover:bg-dark`}
`;

export const DeteleItem = styled(optionItem)`
  ${tw`text-red-500 hover:bg-red-100`}
`;
