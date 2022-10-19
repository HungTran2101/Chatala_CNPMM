import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { merge, zoomIn, slideInRight, slideInDown } from "react-animations";

const cbAnimate1 = merge(slideInRight, slideInDown);
const MoreOptionAnimate = keyframes`${merge(zoomIn, cbAnimate1)}`;

export const MoreOptions = styled.div`
  ${tw`px-2 py-3 bg-blue-50 absolute rounded-2xl shadow-md z-30 right-[25px] top-[55px]`}
  animation: 0.2s ${MoreOptionAnimate};
`;

export const optionItem = styled.div<{ color?: string }>`
  ${tw`text-sm px-3 py-2 rounded-2xl cursor-pointer`}
`;

export const NormalItem = styled(optionItem)`
  ${tw`hover:bg-blue-200`}
`;

export const DeteleItem = styled(optionItem)`
  ${tw`text-red-500 hover:bg-red-50`}
`;
