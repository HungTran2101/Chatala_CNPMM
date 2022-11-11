import styled from 'styled-components';
import tw from 'twin.macro';

export const ChatList = styled.div`
  ${tw`overflow-y-scroll flex-grow h-0 rounded-2xl mt-2.5 pr-1`}
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

export const Wrapper = styled.div`
  ${tw``}
`;
