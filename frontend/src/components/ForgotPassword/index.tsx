import FormTemplate from '../Global/FormTemplate';
import { Formik, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as S from './ForgotPassword.styled';
import * as Yup from 'yup';

const RenewPassword = () => {
  const initialValues = {
    phoneNumber: '',
  };
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('This field is required.')
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        'Phone number invalid.'
      ),
  });
  return (
    <FormTemplate>
      <Link href='/login'>
        <span>
          <S.BackIcon />
        </span>
      </Link>
      <S.Suggest>
        {`Enter your account's phone number to renew your password!`}
      </S.Suggest>
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
              <S.Button type='submit'>Sign up</S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.SignUp>
        <Link href='/register'>
          <span>
            <p>Remembered your password?</p>
            <p>{`Let's Sign Up!`}</p>
          </span>
        </Link>
      </S.SignUp>
    </FormTemplate>
  );
};

export default RenewPassword;
