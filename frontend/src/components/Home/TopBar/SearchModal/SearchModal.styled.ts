import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import { merge, zoomIn, slideInDown } from 'react-animations';

const SearchModalAnimate = keyframes`${merge(zoomIn, slideInDown)}`;

export const SearchModal = styled.div`
  ${tw`absolute top-[50px] w-full bg-primary flex flex-col py-2.5 px-3.5 rounded-[20px] shadow-md z-10 border-darker border-2`}
  animation: 0.3s ${SearchModalAnimate};
`;

export const SearchModalList = styled.div`
  ${tw`max-h-[70vh] overflow-y-scroll pr-1`}
  &::-webkit-scrollbar-track {
    ${tw`bg-transparent rounded-[10px]`}
  }

  &::-webkit-scrollbar {
    ${tw`w-[5px]`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`bg-dark rounded-[50px]`}
  }
`;

export const SearchModalItem = styled.div`
  ${tw`relative flex p-2 rounded-[20px] my-1.5 items-center w-full bg-secondary`}
`;

export const SearchModalInfo = styled.div`
  ${tw`relative flex items-center hover:cursor-pointer flex-grow`}
`;

export const SearchModalAvatar = styled.figure`
  ${tw`relative w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 1px solid gray;
`;
export const SearchModalNameWrapper = styled.div`
  ${tw`relative ml-3.5 w-full`}
`;

export const SearchModalName = styled.div`
  ${tw`text-blue-700 font-semibold text-[18px]`}
`;

export const SearchModalNumFriend = styled.div`
  ${tw`text-[#434343] text-[16px]`}
`;

export const SearchModalOption = styled.div`
  ${tw`text-white text-center rounded-[20px] min-w-[115px] font-semibold text-sm px-5 py-2.5 ml-1 hover:cursor-pointer hover:opacity-80`}
`;

export const SearchModalMessage = styled(SearchModalOption)`
  ${tw`bg-blue-500`}
`;

export const SearchModalAddFriend = styled(SearchModalOption)`
  ${tw`bg-darker`}
`;

export const SearchModalPending = styled(SearchModalOption)`
  ${tw`bg-gray-500 opacity-50 hover:opacity-50 hover:cursor-default`}
`;

export const SearchModalAccept = styled(SearchModalOption)`
  ${tw`bg-green-500 mr-1`}
`;

export const SearchModalDecline = styled(SearchModalOption)`
  ${tw`bg-red-500`}
`;

export const FlexWrap = styled.div`
  ${tw`flex`}
`;
