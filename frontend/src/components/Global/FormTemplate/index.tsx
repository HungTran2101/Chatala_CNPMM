import * as S from "./FormTemplate.styled";
import Image from "next/image";
import LogoFullLong from "../../../assets/imgs/LogoFullLong.png";

interface childrenProps {
    children: React.ReactNode
}
const FormTemplate = ({children}: childrenProps) => {
    return (
        <S.Content>
            <S.Wrapper>
                <S.Logo>
                    <Image src={LogoFullLong}/>
                </S.Logo>
                {children}
            </S.Wrapper>
        </S.Content>
    );
}

export default FormTemplate;