import FormTemplate from '../Global/FormTemplate';
import { Formik, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as S from './RenewPassword.styled';
import * as Yup from 'yup';

const RenewPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('This field is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
      ),

    confirmPassword: Yup.string()
      .required('This field is required.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  });
  return (
    <FormTemplate>
      <Link href='/register'>
        <span>
          <S.BackIcon />
        </span>
      </Link>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <S.Suggest>Let's renew your password!</S.Suggest>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log('submits: ', data);
        }}
      >
        {({ errors, touched }) => (
          <S.NewForm>
            <S.SetWidth>
              <S.Input
                placeholder='Renew password'
                type='password'
                name='password'
                error={errors.password && touched.password ? 1 : 0}
              />
              <ErrorMessage name='password' component={S.ErrorMsg} />
              <S.Input
                placeholder='Confirm password'
                type='password'
                name='confirmPassword'
                error={
                  errors.confirmPassword && touched.confirmPassword ? 1 : 0
                }
              />
              <ErrorMessage name='confirmPassword' component={S.ErrorMsg} />
              <S.Button type='submit'>Sign up</S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.SignUp>
        <Link href='/register'>
          <span>
            <p>Remembered your password?</p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Let's Sign Up!</p>
          </span>
        </Link>
      </S.SignUp>
    </FormTemplate>
  );
};

export default RenewPassword;
