import styled from 'styled-components';
import tw from 'twin.macro';
import { Form } from 'formik';
export const ChangePassword = styled.div`
  ${tw`px-[30px] py-5`}
`;

export const NewForm = styled(Form)`
  ${tw`flex flex-col`}
`;

export const Title = styled.p`
  ${tw`text-xl font-bold mb-[30px]`}
`;

export const Input = styled.input`
  ${tw`outline-none text-base px-[10px] py-[5px] w-full text-gray-500 relative z-10 bg-transparent`}
`;

export const InputWrap = styled.div`
  ${tw`border-b-[1px] border-b-darker inline-block w-[80%] mb-5 relative ml-[10px]`}
`;

export const Label = styled.label<{ active: boolean }>`
  ${tw`text-base text-dark absolute top-[10px] left-[10px] opacity-50 duration-300`}
  ${({ active }) => active && tw`top-[-10px] left-0 opacity-100 text-xs z-0`}
`;

export const ErrorMsg = styled.div`
  ${tw`text-base text-[red]`}
`;

export const Button = styled.button`
  ${tw`shadow text-center text-white bg-dark rounded-xl text-base font-semibold cursor-pointer hover:bg-darker hover:text-white px-5 py-[10px] mb-[10px] duration-100`}
`;

export const ButtonWrap = styled.div`
  ${tw`flex justify-end w-[100%]`}
`;
