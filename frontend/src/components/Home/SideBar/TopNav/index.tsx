import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './TopNav.styled';
import { useState } from 'react';
import CreateGroup from './CreateGroup';
import { useGlobalContext } from '../../../../contexts/globalContext';

interface ITopNav {
  setSelected: (number: number) => void;
}

const TopNav = ({ setSelected }: ITopNav) => {
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false);
  const context = useGlobalContext();

  return (
    <S.Wrapper>
      <S.Options>
        <S.AddOption onClick={() => setToggleCreateGroup(true)} />
      </S.Options>
      <ChatPreviewItem
        id={-2}
        active={false}
        msg='Halo halo niece and nephew, today uncle Roger'
        setSelected={setSelected}
        onClick={() => context.setRoomMsg([])}
      />
      {toggleCreateGroup && <CreateGroup setToggleCreateGroup={setToggleCreateGroup} />}
    </S.Wrapper>
  );
};

export default TopNav;
