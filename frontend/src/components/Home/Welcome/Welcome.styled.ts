import styled from "styled-components";
import tw from "twin.macro";

export const Welcome = styled.div`
  ${tw`flex-grow flex justify-center`}
`;

export const WelcomeContent = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;

export const WelcomeText = styled.div`
  ${tw`flex items-center text-2xl italic`}
`;

export const WelcomeLogo = styled.figure`
  ${tw`ml-2.5`}
`;

export const WelcomeFeature = styled.div`
  ${tw`flex flex-col items-center mt-[50px] mb-[100px]`}
`;

export const WelcomeFeatureImage = styled.figure`
  ${tw`w-[400px] mb-5`}
`;

export const WelcomeFeatureDescription = styled.div`
  ${tw`mb-3.5 text-[#0154B3] text-xl font-semibold`}
`;

export const WelcomeFeatureDetail = styled.div``;
