import * as S from "./NotiModal.styled";
import * as React from "react";
import { NotiListArray } from "../../../../utils/dataConfig";
import Image from "next/image";
import { useOutsideClick } from "../../../Global/ProcessFunctions";

interface INotiModal {
  setActiveNotiModal: (isActive: boolean) => void;
}

const NotiModal = ({ setActiveNotiModal }: INotiModal) => {
  const handleOutsideClick = () => {
    setActiveNotiModal(false);
  };

  const NotiRef = useOutsideClick(handleOutsideClick);

  return (
    <S.Noti ref={NotiRef}>
      <S.NotiTitles>Friend Requests</S.NotiTitles>
      {NotiListArray.map((data, index) => (
        <S.NotiItem key={index}>
          <S.NotiInfo>
            <S.NotiAvatar>
              <Image src={data.avatar} alt="avatar" />
            </S.NotiAvatar>
            <S.NotiNameWrapper>
              <S.NotiName>{data.name}</S.NotiName>
              <S.NotiNumFriend>{`${data.numFriends} Friends`}</S.NotiNumFriend>
            </S.NotiNameWrapper>
          </S.NotiInfo>
          <S.NotiAccept>Accept</S.NotiAccept>
          <S.NotiCancel>Cancel</S.NotiCancel>
        </S.NotiItem>
      ))}
    </S.Noti>
  );
};

export default NotiModal;
