import FormTemplate from "../Global/FormTemplate"
import { authentication } from "../Global/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { NumberPhoneArea } from "../../utils/dataConfig";

import { Formik, ErrorMessage } from "formik"
import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./Register.styled";
import * as Yup from "yup";
import { ChangeEvent } from "react";
import { useGlobalContext } from "../../contexts/globalContext";

declare global {
    interface Window {
        recaptchaVerifier: any
        confirmationResult: any
    }
}

type FormValue = {
    name: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    phomeNumberCode: string,
} 

const Register = () => {
    const context = useGlobalContext();
    const router = useRouter();

    const initialValues = {
        name: context.registerInfo.name,
        phoneNumber: context.registerInfo.phoneNumber,
        password: context.registerInfo.password ,
        confirmPassword: '',
        phomeNumberCode: '+84',
    }

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

        confirmPassword: Yup.string()
                .required('This field is required.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    })

    const requestOTP = async (newPhoneNumber: string) => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response: string) => {}
        }, authentication);

        let appVerifier = window.recaptchaVerifier
        await signInWithPhoneNumber(authentication, newPhoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = async (values: FormValue, { resetForm }: any) => {
        console.log(values)
        const newPhoneNumber = values.phomeNumberCode + values.phoneNumber.substring(1);
        await requestOTP(newPhoneNumber);

        context.setRegisterInfo(values);

        resetForm();

        router.push({
            pathname: '/otp',
            query: { 
                phoneVerify: 'otp'
            }
        }, '/otp');
    }

    return (
        <FormTemplate>
            <S.Suggest>
                Create your account!
            </S.Suggest>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue }) => (
                    <S.NewForm>
                        <S.SetWidth>
                            <S.InputGroup
                                error={errors.phoneNumber && touched.phoneNumber ? true : false}
                            >
                                <S.Select name="phomeNumberCode" onChange={(e: ChangeEvent) => {
                                    const input = e.target as HTMLInputElement
                                    setFieldValue('phomeNumberCode', input.value);
                                    }}
                                >
                                    {
                                        NumberPhoneArea.map((data, index) => (
                                            <option key={index} value={data.dial_code}>{data.dial_code}</option>
                                        ))
                                    }
                                </S.Select>
                                <S.ShortInputDiv>
                                    <div id="recaptcha-container"></div>
                                    <S.ShortInput
                                        placeholder="Phone number"
                                        name="phoneNumber"
                                        error={errors.phoneNumber && touched.phoneNumber ? 1 : 0}
                                    />
                                    <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />
                                </S.ShortInputDiv>
                            </S.InputGroup>
                            <S.Input 
                                placeholder="Your name"
                                name="name"
                                error={errors.name && touched.name ? 1 : 0}
                            />
                            <ErrorMessage name='name' component={S.ErrorMsg} />
                            <S.Input 
                                placeholder="Password"
                                type="password"
                                name="password"
                                error={errors.password && touched.password ? 1 : 0}
                            />
                            <ErrorMessage name='password' component={S.ErrorMsg} />
                            <S.Input 
                                placeholder="Confirm password"
                                type="password"
                                name="confirmPassword"
                                error={errors.confirmPassword && touched.confirmPassword ? 1 : 0}
                            />    
                            <ErrorMessage name='confirmPassword' component={S.ErrorMsg} />
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
}

export default Register;