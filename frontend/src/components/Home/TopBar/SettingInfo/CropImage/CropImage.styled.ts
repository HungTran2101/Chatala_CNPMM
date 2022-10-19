import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Modal = styled.div`
  ${tw`fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-[999]`}
  animation: ${fadeIn} linear 0.15s;
`;

export const ModalOverlay = styled.div`
  ${tw`w-full h-full absolute bg-[rgba(0, 0, 0, 0.25)] z-0`}
`;

export const ModalBody = styled.div`
  ${tw`fixed top-[50%] left-[50%] bg-[#fff] w-[500px] rounded-[50px] flex justify-start flex-col z-[999]`}
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 16px rgb(0 0 0 / 15%);
  animation: ${fadeIn} linear 0.15s;
`;

export const Content = styled.div`
  ${tw`w-full h-[400px] relative bg-[#000] z-10`}
`;

export const Title = styled.span`
  ${tw`py-[18px] px-6 text-xl`}
`;

export const Action = styled.div`
  ${tw`flex items-center p-2 justify-end flex-col my-4 mx-6 flex-[0_0_auto]`}
  -webkit-box-align: center;
  -webkit-box-pack: end;
`;

export const ZoomAndRotate = styled.div`
  ${tw`w-full font-bold`}
`;

export const Button = styled.button`
  ${tw`w-[125px] rounded-[50px] bg-[#7098b9] py-1.5 px-0 text-[#fff] mt-6 tracking-[1px] font-bold flex justify-center items-center hover:opacity-80`}
  & p {
    ${tw`ml-1.5`}
  }
  & svg {
    ${tw`text-2xl`}
  }
`;

export const Slider = styled.input`
  ${tw`w-full h-2.5 my-[18px] mx-0 rounded-xl bg-[#d3d3d3] outline-none opacity-70 cursor-pointer transition-opacity duration-200`}
  -webkit-appearance: none;
  -webkit-transition: 0.2s;
  &::-webkit-slider-thumb {
    ${tw`w-5 h-5 appearance-none rounded-[50%] cursor-pointer bg-[#7098b9]`}
    -webkit-appearance: none;
  }
  &::-moz-range-thumb {
    ${tw`w-[25px] h-[25px] bg-[#04AA6D] cursor-pointer`}
  }
`;

export const ButtonCropZone = styled.div`
  ${tw`flex justify-center items-center`}
  > * {
    &:first-child {
      ${tw`mr-1`}
    }
    &:last-child {
      ${tw`ml-1`}
    }
  }
`;
