import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { UsersApi } from '../../../../../services/api/users';
import * as S from './ChangePassword.styled';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    "Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
  ),
  passwordConfirm: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.newPassword === value
    })
});

const ChangePassword = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    passwordConfirm: '',
  };

  const [focus, setFocus] = useState('');
  const [input, setInput] = useState({
    oldPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });


  return (
    
    <S.ChangePassword>
      <S.Title>Change Password</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) => {

          try {
            const result = await UsersApi.changePassword(data.oldPassword, data.newPassword)
            alert("Update password complete!");
          } catch (error : any) {
            alert(error.errors.message);
          }

        }}
      >
        {({ errors, touched, setFieldValue }) => (
        <S.NewForm>
                    <S.InputWrap>
            <S.Input
              type='password'
              name='oldPassword'
              id='oldPassword'
              onFocus={(e) => setFocus(e.target.name)}
              onChange={(e)=> setFieldValue('oldPassword',e.target.value)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={() => setFocus('')}
            />
            <ErrorMessage name='oldPassword' component={S.ErrorMsg} />
            <S.Label
              htmlFor='oldPassword'
              active={focus === 'oldPassword' || input.oldPassword !== ''}
            >
              Old Password
            </S.Label>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type='password'
              name='newPassword'
              id='newPassword'
              onFocus={(e) => setFocus(e.target.name)}
              onChange={(e)=> setFieldValue('newPassword',e.target.value)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={() => setFocus('')}
            />
            <ErrorMessage name='newPassword' component={S.ErrorMsg} />
            <S.Label
              htmlFor='newPassword'
              active={focus === 'newPassword' || input.newPassword !== ''}
            >
              New Password
            </S.Label>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              onFocus={(e) => setFocus(e.target.name)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onChange={(e)=> setFieldValue('passwordConfirm',e.target.value)}
              onBlur={() => setFocus('')}
            />
            <ErrorMessage name='passwordConfirm' component={S.ErrorMsg} />
            <S.Label
              htmlFor='passwordConfirm'
              active={focus === 'passwordConfirm' || input.passwordConfirm !== ''}
            >
              New Password Confirm
            </S.Label>
          </S.InputWrap>
          <S.ButtonWrap>
            <S.Button type='submit'>Update</S.Button>
          </S.ButtonWrap>
        </S.NewForm>
        )}
      </Formik>
    </S.ChangePassword>
  );
};

export default ChangePassword;
