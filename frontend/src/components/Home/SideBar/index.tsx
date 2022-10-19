import ChatList from "./ChatList";
import * as S from "./SideBar.styled"
import TopNav from "./TopNav";
import { useState } from 'react';

const SideBar = () => {
  const [selected, setSelected] = useState(-1);

  return (
    <S.SideBarContainer>
      <TopNav setSelected={setSelected} />
      <ChatList selected={selected} setSelected={setSelected} />
    </S.SideBarContainer>
  );
}

export default SideBar;