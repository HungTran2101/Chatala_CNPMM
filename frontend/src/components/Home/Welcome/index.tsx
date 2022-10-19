import Image from "next/image";
import logo from "../../../assets/imgs/LogoFullLong.png";
import chatbot from "../../../assets/imgs/chatbot.png";
import * as S from "./Welcome.styled";

const Welcome = () => {
  return (
    <S.Welcome>
      <S.WelcomeContent>
        <S.WelcomeText>
          Chào mừng đến với
          <S.WelcomeLogo>
            <Image src={logo} alt="WelcomeLogo" />
          </S.WelcomeLogo>
        </S.WelcomeText>
        <S.WelcomeFeature>
          <S.WelcomeFeatureImage>
            <Image src={chatbot} alt="chatbot feature" />
          </S.WelcomeFeatureImage>
          <S.WelcomeFeatureDescription>
            Trải nghiệm tính năng ChatBot tuyệt vời!
          </S.WelcomeFeatureDescription>
          <S.WelcomeFeatureDetail>
            Giờ đây bạn có thể chat với ChatBot về những thắc mắc của bạn một cách nhanh chóng
          </S.WelcomeFeatureDetail>
        </S.WelcomeFeature>
      </S.WelcomeContent>
    </S.Welcome>
  );
};

export default Welcome;
