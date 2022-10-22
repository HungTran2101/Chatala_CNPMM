import styled from "styled-components";
import tw from "twin.macro";
import { TiUserAddOutline } from "react-icons/ti";

export const Wrapper = styled.div`
  ${tw`bg-secondary rounded-[30px] shadow-md`}
`;

export const Options = styled.div`
  ${tw`flex justify-center text-darker text-[35px] py-1`}
`;

export const AddOption = styled(TiUserAddOutline)`
  ${tw`hover:cursor-pointer hover:opacity-80 mx-2`}
`;
