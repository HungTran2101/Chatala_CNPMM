import FormTemplate from "../Global/FormTemplate";
import { authentication } from "../Global/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { NumberPhoneArea } from "../../utils/dataConfig";

import { Formik, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./Register.styled";
import * as Yup from "yup";
import { useGlobalContext } from "../../contexts/globalContext";

type FormValue = {
  name: string;
  confirmPassword: string;
  password: string;
  email: string;
};

const Register = () => {
  const context = useGlobalContext();
  const router = useRouter();

  const initialValues = {
    name: context.registerInfo.name,
    email: context.registerInfo.email,
    password: context.registerInfo.password,
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required.")
      .email("Not a valid email"),
    name: Yup.string().required("This field is required."),
    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
      ),

    confirmPassword: Yup.string()
      .required("This field is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),
  });

  const requestOTP = async (email: string) => {};

  const handleSubmit = async (values: FormValue, { resetForm }: any) => {
    console.log(values);
    await requestOTP(values.email);

    context.setRegisterInfo(values);

    resetForm();

    router.push(
      {
        pathname: "/otp",
        query: {
          phoneVerify: "otp",
        },
      },
      "/otp"
    );
  };

  return (
    <FormTemplate>
      <S.Suggest>Create your account!</S.Suggest>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <S.NewForm>
            <S.SetWidth>
              <S.InputGroup
                error={errors.email && touched.email ? true : false}
              >
                <S.ShortInputDiv>
                  <S.ShortInput
                    placeholder="Your Email"
                    name="email"
                    error={errors.email && touched.email ? 1 : 0}
                  />
                  <ErrorMessage name="email" component={S.ErrorMsg} />
                </S.ShortInputDiv>
              </S.InputGroup>
              <S.Input
                placeholder="Your name"
                name="name"
                error={errors.name && touched.name ? 1 : 0}
              />
              <ErrorMessage name="name" component={S.ErrorMsg} />
              <S.Input
                placeholder="Password"
                type="password"
                name="password"
                error={errors.password && touched.password ? 1 : 0}
              />
              <ErrorMessage name="password" component={S.ErrorMsg} />
              <S.Input
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                error={
                  errors.confirmPassword && touched.confirmPassword ? 1 : 0
                }
              />
              <ErrorMessage name="confirmPassword" component={S.ErrorMsg} />
              <S.Button type="submit">Continue</S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.Login>
        <Link href="/login">
          <span>
            <p>Already have one?</p>
            <p>Let's Sign In!</p>
          </span>
        </Link>
      </S.Login>
    </FormTemplate>
  );
};

export default Register;
