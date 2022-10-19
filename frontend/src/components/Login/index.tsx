import FormTemplate from '../Global/FormTemplate';
import { Formik, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as S from './Login.styled';
import * as Yup from 'yup';

const Login = () => {
  const initialValues = {
    phoneNumber: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('This field is required.')
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        'Phone number invalid.'
      ),

    password: Yup.string()
      .required('This field is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
      ),
  });
  return (
    <FormTemplate>
      <S.Suggest>Signin to this fancy webchat!</S.Suggest>
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
                placeholder='Phone number'
                name='phoneNumber'
                error={errors.phoneNumber && touched.phoneNumber ? 1 : 0}
              />
              <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />

              <S.Input
                placeholder='Password'
                type='password'
                name='password'
                error={errors.password && touched.password ? 1 : 0}
              />
              <ErrorMessage name='password' component={S.ErrorMsg} />

              <S.Forgot>
                <Link href='/forgot-password'>Forgot Password?</Link>
              </S.Forgot>
              <S.Button type='submit'>Sign in</S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.Register>
        <Link href='/register'>New here? Let's Sign Up!</Link>
      </S.Register>
    </FormTemplate>
  );
};

export default Login;
