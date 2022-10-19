import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { zoomIn } from "react-animations";
import { BiSearchAlt } from "react-icons/bi";

export const AddFriendModal = styled.div`
  ${tw`flex fixed top-0 left-0 bottom-0 right-0 z-30`}
`;

export const AddFriendOverlay = styled.div`
  ${tw`absolute bg-[#00000080] h-full w-full`}
`;

const fadeInAnimate = keyframes`${zoomIn}`;

export const AddFriendBody = styled.div`
  ${tw`m-auto bg-[#7199BA] py-2.5 px-3.5 rounded-[25px] z-10`}
  border: 2px solid #ECF2F7;
  animation: 0.25s ${fadeInAnimate};
`;

export const AddFriendSearch = styled.div`
  ${tw`relative max-w-[550px] w-full flex items-center mb-6`}
`;
export const AddFriendSearchInput = styled.input`
  ${tw`bg-[#F8F8F8] text-lg rounded-[50px] pr-2 pl-9 py-2 w-full`}
  outline: none;
`;

export const AddFriendSearchIcon = styled(BiSearchAlt)`
  ${tw`absolute hover:cursor-pointer text-[28px] text-[#002B98] ml-1.5 left-0`}
`;

export const AddFriendItem = styled.div`
  ${tw`flex p-2 rounded-[50px] my-1.5 items-center relative w-full bg-[#ECF2F7]`}
`;

export const AddFriendInfo = styled.div`
  ${tw`flex items-center hover:cursor-pointer`}
`;

export const AddFriendAvatar = styled.figure`
  ${tw`w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;
export const AddFriendNameWrapper = styled.div`
  ${tw`ml-3.5`}
`;

export const AddFriendName = styled.div`
  ${tw`font-semibold text-[18px] w-[200px] overflow-ellipsis`}
`;

export const AddFriendNumFriend = styled.div`
  ${tw`text-[#434343] text-[16px]`}
`;

export const AddFriendOption = styled.div`
  ${tw`text-[#4898FF] bg-[#43556C] rounded-[50px] font-semibold text-sm px-5 py-2.5 ml-1 hover:cursor-pointer opacity-90`}
  text-shadow: 0 0 2px #4898FF;
  &:hover {
    opacity: 1;
    text-shadow: 0 0 5px #4898ff;
  }
`;
