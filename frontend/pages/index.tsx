import ChatArea from '../src/components/Home/ChatArea';
import * as S from '../src/components/Home/Home.styled';
import SideBar from '../src/components/Home/SideBar';
import TopBar from '../src/components/Home/TopBar';
import Welcome from '../src/components/Home/Welcome';
import { useGlobalContext } from '../src/contexts/globalContext';

const Home = () => {
  const context = useGlobalContext();

  return (
    <>
      <S.HomeContainer>
        <TopBar />
        <S.Wrapper>
          <SideBar />
          {context.roomMsg?.length > 0 ? <ChatArea /> : <Welcome />}
        </S.Wrapper>
      </S.HomeContainer>
    </>
  );
};

export default Home;
