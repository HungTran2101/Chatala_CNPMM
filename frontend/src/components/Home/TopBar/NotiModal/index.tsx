import * as S from './NotiModal.styled';
import * as React from 'react';
import { NotiListArray } from '../../../../utils/dataConfig';
import Image from 'next/image';
import { useOutsideClick } from '../../../Global/ProcessFunctions';
import { IoPersonAdd } from 'react-icons/io5';

interface INotiModal {
  setActiveNotiModal: (isActive: boolean) => void;
  isFriendRequest?: boolean;
}

const NotiModal = ({ setActiveNotiModal, isFriendRequest }: INotiModal) => {
  const handleOutsideClick = () => {
    setActiveNotiModal(false);
  };

  const NotiRef = useOutsideClick(handleOutsideClick);

  return (
    <S.Noti isFriendRequest={true} ref={NotiRef}>
      <S.NotiTitles>{isFriendRequest ? 'Search answer' : 'Friend Requests'}</S.NotiTitles>
      {NotiListArray.map((data, index) => (
        <S.NotiItem key={index}>
          <S.NotiInfo>
            <S.NotiAvatar>
              <Image src={data.avatar} alt='avatar' layout='fill' />
            </S.NotiAvatar>
            <S.NotiNameWrapper>
              <S.NotiName>{data.name}</S.NotiName>
              <S.NotiNumFriend>{`${data.numFriends} Friends`}</S.NotiNumFriend>
            </S.NotiNameWrapper>
          </S.NotiInfo>
          <S.NotiAccept>{isFriendRequest ? <IoPersonAdd fontSize={'22px'}/> : 'Accept'}</S.NotiAccept>
        {!isFriendRequest && <S.NotiCancel>Cancel</S.NotiCancel>}
        </S.NotiItem>
      ))}
    </S.Noti>
  );
};

export default NotiModal;
