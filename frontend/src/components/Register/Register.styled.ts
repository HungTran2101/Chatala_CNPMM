import styled from "styled-components";
import { Form, Field } from "formik";
import tw from "twin.macro";
import React from "react";

export const Suggest = styled.span`
  ${tw`text-lg mt-6`}
`;

export const NewForm = styled(Form)`
  ${tw`w-4/5`}
`;

export const InputGroup = styled.div<{ error: boolean }>`
  ${tw`w-full h-[50px] mt-6 flex items-center justify-center`}
  ${({ error }) => (error ? tw`mb-6` : tw`mb-0`)};
`;

export const ShortInputDiv = styled.div`
  ${tw`w-full h-full`}
`;

export const ShortInput = styled(Field)<{ error: boolean }>`
  ${tw`w-full h-full outline-none py-2 px-4 border-b border-[#0154b1]`}
  ${({ error }) =>
    error === 1
      ? tw`border border-red-500`
      : tw`border-b border-solid border-[#0154b1]`};
`;

export const Input = styled(Field)<{ error: boolean }>`
  ${tw`w-full h-12 outline-none mt-6 py-2 px-4`}
  ${({ error }) =>
    error === 1
      ? tw`border border-red-500`
      : tw`border-b border-solid border-[#0154b1]`};
`;

export const Select = styled.select`
  ${tw`w-[10%] h-full italic outline-none py-2 mr-3 border-b border-[#0154b1] flex-1 cursor-pointer max-h-32`}
`;

export const Button = styled.button`
  ${tw`w-1/3 h-11 bg-[#0154b1] text-[#fff] block rounded-md py-2 px-4 font-bold mt-11 mb-5 mx-auto hover:opacity-80`}
`;

export const ErrorMsg = styled.div`
  ${tw`text-red-500 mt-2`}
`;

export const SetWidth = styled.div`
  ${tw`w-full`}
`;

export const Login = styled.div`
  ${tw`mb-11 text-green-600 italic text-center cursor-pointer`}
`;
