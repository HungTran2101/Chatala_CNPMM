import styled from "styled-components";
import tw from "twin.macro";
import { MdCancel } from "react-icons/md";

export const FilePreview = styled.div`
  ${tw`relative flex items-center mx-2 h-[50px] pl-1.5 pr-3.5 py-1 bg-primary rounded-[10px] shadow-md`}
`;

export const FilePreviewIcon = styled.div`
  ${tw`flex items-center justify-center p-1.5 bg-secondary rounded-full`}
`;

export const FilePreviewName = styled.div`
  ${tw`ml-1.5 w-[120px] text-[16px] font-semibold text-darker`}
`;

export const FilePreviewImage = styled.div`
  ${tw`relative mx-2 z-10`}
`;

export const FilePreviewImageFigure = styled.figure`
  ${tw`relative w-[50px] h-[50px] rounded-[7px] overflow-hidden shadow-md`}
`;

export const FilePreviewRemove = styled(MdCancel)`
  ${tw`absolute transition-colors bg-gray-200 rounded-full text-[25px] hover:opacity-80 hover:cursor-pointer right-[-10px] top-[-10px]`}
`;
