import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './TopNav.styled';
import { Dispatch, SetStateAction, useState } from 'react';
import AddFriend from './AddFriend';
import { useGlobalContext } from '../../../../contexts/globalContext';

interface ITopNav {
  setSelected: (number: number) => void;
}

const TopNav = ({ setSelected }: ITopNav) => {
  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const context = useGlobalContext();

  return (
    <S.Wrapper>
      <S.Options>
        <S.AddOption onClick={() => setToggleAddFriend(true)} />
      </S.Options>
      <ChatPreviewItem
        id={-2}
        active={false}
        msg='Halo halo niece and nephew, today uncle Roger'
        setSelected={setSelected}
        onClick={() => context.setRoomMsg([])}
      />
      {toggleAddFriend && <AddFriend setToggleAddFriend={setToggleAddFriend} />}
    </S.Wrapper>
  );
};

export default TopNav;
