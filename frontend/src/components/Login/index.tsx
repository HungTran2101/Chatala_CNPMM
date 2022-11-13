import FormTemplate from "../Global/FormTemplate";
import { Formik, ErrorMessage } from "formik";
import Link from "next/link";
import * as S from "./Login.styled";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { UsersApi } from "../../services/api/users";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required.")
      .email("Not a valid email"),

    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
      ),
  });
  const router = useRouter();
  return (
    <FormTemplate>
      <S.Suggest>Signin to this fancy webchat!</S.Suggest>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) => {
          try {
            const result = await UsersApi.login(data);
            if (result) {
              router.push("/");
            }
          } catch (error) {
            alert("Wrong password or email");
          }
        }}
      >
        {({ errors, touched }) => (
          <S.NewForm>
            <S.SetWidth>
              <S.Input
                placeholder="Your Email"
                name="email"
                error={errors.email && touched.email ? 1 : 0}
              />
              <ErrorMessage name="phoneNumber" component={S.ErrorMsg} />

              <S.Input
                placeholder="Password"
                type="password"
                name="password"
                error={errors.password && touched.password ? 1 : 0}
              />
              <ErrorMessage name="password" component={S.ErrorMsg} />

              <S.Forgot>
                <Link href="/forgot-password">Forgot Password?</Link>
              </S.Forgot>
              <S.Button type="submit">Sign in</S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.Register>
        <Link href="/register">New here? Let&apos;s Sign Up!</Link>
      </S.Register>
    </FormTemplate>
  );
};

export default Login;
