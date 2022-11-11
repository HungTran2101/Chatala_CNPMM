import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import { zoomIn } from 'react-animations';
import { BiSearchAlt } from 'react-icons/bi';

export const CreateGroupModal = styled.div`
  ${tw`flex fixed top-0 left-0 bottom-0 right-0 z-30`}
`;

export const CreateGroupOverlay = styled.div`
  ${tw`absolute bg-[#00000080] h-full w-full`}
`;

const zoomInAnimate = keyframes`${zoomIn}`;

export const CreateGroupBody = styled.div`
  ${tw`m-auto bg-darker py-2.5 px-3.5 rounded-[25px] z-10 min-w-[400px]`}
  border: 2px solid #ECF2F7;
  animation: 0.25s ${zoomInAnimate};
`;

export const CreateGroupTitle = styled.div`
  ${tw`text-2xl font-semibold mb-3 ml-1`}
`;

export const CreateGroupSearch = styled.div`
  ${tw`relative max-w-[550px] w-full flex items-center mb-6`}
`;
export const CreateGroupSearchInput = styled.input`
  ${tw`bg-[#F8F8F8] text-lg rounded-[50px] pr-2 pl-9 py-2 w-full`}
  outline: none;
`;

export const CreateGroupSearchIcon = styled(BiSearchAlt)`
  ${tw`absolute hover:cursor-pointer text-[28px] text-[#002B98] ml-1.5 left-0`}
`;

export const CreateGroupItem = styled.div`
  ${tw`flex p-2 rounded-[50px] my-1.5 items-center relative w-full bg-secondary justify-between`}
`;

export const CreateGroupInfo = styled.div`
  ${tw`flex items-center hover:cursor-pointer`}
`;

export const CreateGroupAvatar = styled.figure`
  ${tw`relative w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;

export const CreateGroupName = styled.div`
  ${tw`font-semibold text-[18px] w-[200px] overflow-ellipsis ml-3.5`}
`;

export const CreateGroupOption = styled.div`
  ${tw`text-blue-300 bg-gray-500 rounded-[50px] font-semibold text-sm px-5 py-2.5 ml-1 hover:opacity-100 hover:cursor-pointer opacity-90`}
`;
