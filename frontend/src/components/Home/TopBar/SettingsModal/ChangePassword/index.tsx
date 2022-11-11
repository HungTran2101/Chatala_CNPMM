import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import * as S from './ChangePassword.styled';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
    ),
  passwordConfirm: Yup.string()
    .required('This field is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
    ),
});

const ChangePassword = () => {
  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const [focus, setFocus] = useState('');
  const [input, setInput] = useState({
    phoneNumber: '',
    password: '',
  });

  return (
    <S.ChangePassword>
      <S.Title>Change Password</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log('submits: ', data);
        }}
      >
        <S.Form>
          <S.InputWrap>
            <S.Input
              name='phoneNumber'
              onFocus={(e) => setFocus(e.target.name)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={(e) => setFocus('')}
            />
            <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />
            <S.Label
              htmlFor='phoneNumber'
              active={focus === 'phoneNumber' || input.phoneNumber !== ''}
            >
              Phone number
            </S.Label>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type='password'
              name='password'
              onFocus={(e) => setFocus(e.target.name)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={() => setFocus('')}
            />
            <ErrorMessage name='password' component={S.ErrorMsg} />
            <S.Label
              htmlFor='password'
              active={focus === 'password' || input.password !== ''}
            >
              Password
            </S.Label>
          </S.InputWrap>
          <S.ButtonWrap>
            <S.Button>Update</S.Button>
          </S.ButtonWrap>
        </S.Form>
      </Formik>
    </S.ChangePassword>
  );
};

export default ChangePassword;
