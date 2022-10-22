import * as S from './MoreOptions.styled';
import { useOutsideClick } from '../../../Global/ProcessFunctions';
import { roomType } from '../../../../utils/types';
import Image from 'next/image';
import { UserAvatar } from '../../../../utils/dataConfig';
import { AiOutlineEdit } from 'react-icons/ai';

interface IMoreOptions {
  setToggleOption: (toggle: boolean) => void;
  roomInfo: roomType;
}

const MoreOptions = ({ setToggleOption, roomInfo }: IMoreOptions) => {
  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const moreOptionsRef = useOutsideClick(handleOutsideClick);

  return (
    <S.MoreOptions ref={moreOptionsRef}>
      <S.RoomInfo>
        <S.RoomInfoTitle>Room Chat Infomation</S.RoomInfoTitle>
        <S.RoomInfoAvatar>
          <Image src={roomInfo.users[0].avatar} alt='avatar' layout='fill' />
        </S.RoomInfoAvatar>
        <S.RoomInfoName>
          {roomInfo.isGroup ? roomInfo.roomName : roomInfo.users[0].name}
          {roomInfo.isGroup && <S.RoomInfoNameEditIcon />}
        </S.RoomInfoName>
      </S.RoomInfo>
      <S.NormalItem>Friend's profile</S.NormalItem>
      <S.DeteleItem>Delete this chat</S.DeteleItem>
    </S.MoreOptions>
  );
};

export default MoreOptions;
