import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`w-[550px] flex relative items-center flex-col bg-[#0154b1] rounded-[50px] z-[1]`}
  &::before {
    ${tw`content-[''] bg-[#fff] w-full h-full rounded-[50px] absolute z-[-1]`};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    transform: translate(-10px, -10px);
  }
`;

export const Logo = styled.figure`
  ${tw`w-full mt-6 text-center`}
`;

export const Content = styled.div`
  ${tw`w-full h-full fixed flex items-center justify-center`}
`;
