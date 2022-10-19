import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import { merge, zoomIn, slideInRight, slideInDown } from 'react-animations';

const cbAnimate1 = merge(slideInRight, slideInDown);
const MoreOptionAnimate = keyframes`${merge(zoomIn, cbAnimate1)}`;

export const ChatMsgOption = styled.div`
  ${tw`w-[130px] px-2 py-3 bg-white absolute rounded-2xl shadow-md z-30 left-[-110px] top-[20px]`}
  animation: 0.2s ${MoreOptionAnimate};
`;

export const optionItem = styled.div<{ color?: string }>`
  ${tw`text-sm px-3 py-2 rounded-2xl cursor-pointer text-center`}
`;

export const NormalItem = styled(optionItem)`
  ${tw`hover:bg-blue-200`}
`;

export const DeteleItem = styled(optionItem)`
  ${tw`text-red-500 hover:bg-red-100 font-semibold`}
`;
