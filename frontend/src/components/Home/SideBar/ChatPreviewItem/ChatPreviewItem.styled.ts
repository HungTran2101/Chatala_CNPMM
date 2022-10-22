import styled from "styled-components";
import tw from "twin.macro";
import { VscHubot } from "react-icons/vsc";

export const ChatAvatar = styled.figure`
  ${tw`relative w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;

export const ChatBotAvatar = styled(VscHubot)`
  ${tw`text-black text-[55px]`}
`;

export const Content = styled.div`
  ${tw`ml-3.5 overflow-hidden`}
`;

export const Name = styled.div`
  ${tw`font-semibold text-black text-[16px]`}
`;

export const Msg = styled.div`
  ${tw`text-[14px] w-full overflow-hidden whitespace-nowrap`}
  text-overflow: ellipsis;
`;

export const Wrapper = styled.div`
  ${tw`flex px-3 py-2.5 items-center relative w-full`}
`;

export const ChatPreviewItem = styled.div<{ active?: boolean; Id?: number }>`
  ${tw`flex items-center relative hover:cursor-pointer hover:bg-dark rounded-[20px]`}
  ${({ active }) => active && tw`bg-darker`}
  ${({ Id }) => (Id !== -2 ? tw`my-1` : tw`bg-dark`)}
`;
