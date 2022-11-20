import FormTemplate from "../Global/FormTemplate";
import { Formik, ErrorMessage } from "formik";
import Link from "next/link";
import * as S from "./OTPForm.styled";
import { withRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/globalContext";
import { UsersApi } from "../../services/api/users";
import { API_URL } from "../../services/api/urls";

type User = {
  name: string;
  phone: string;
  password: string;
};

const OTPCode = (props: any) => {
  const [checkError, setCheckError] = useState("false");
  const [countdown, setCountdown] = useState(30);
  const [hiddenButton, setHiddenButton] = useState(true);
  const router = useRouter()
  const initialValues = {
    verifiedtoken: "",
  };

  const context = useGlobalContext();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const result = await UsersApi.otpRegister(values)
      if (result ) {
        router.push('/login')
      }
    } catch (error) {
      alert('error')
    }
  };

  useEffect(() => {
    if (!props.router.query.phoneVerify) {
      router.replace("/register");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setHiddenButton(false);
        setCountdown(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <FormTemplate>
      <Link href="/register">
        <span>
          <S.BackIcon />
        </span>
      </Link>
      <S.Suggest>Make sure your phone number is real!</S.Suggest>
      <S.Notify>
        Please check verification OTP code sent to your phone and write below
      </S.Notify>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, setSubmitting }) => (
          <S.NewForm>
            <S.SetWidth>
              <S.Input
                placeholder="Verification OTP code"
                name="verifiedtoken"
                checkerror={checkError}
              />
              {checkError === "true" && <S.ErrorMsg>Incorrect otp!</S.ErrorMsg>}
              <S.CountDown>Time Remaining: {countdown}s</S.CountDown>
              <S.ButtonVerify
                hidden={hiddenButton}
                onClick={() => router.back()}
              >
                <S.CheckPhoneNumber>
                  <p>Not receive OTP code?</p>
                  <p>Please check your phone number again!</p>
                </S.CheckPhoneNumber>
              </S.ButtonVerify>
              <S.Button type="submit" disabled={isSubmitting ? true : false}>
                Verify
              </S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
    </FormTemplate>
  );
};

export default withRouter(OTPCode);
