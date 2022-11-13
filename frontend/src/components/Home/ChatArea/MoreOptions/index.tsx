import * as S from './MoreOptions.styled';
import { useOutsideClick } from '../../../Global/ProcessFunctions';
import { roomInfo } from '../../../../utils/types';
import Image from 'next/image';
import { UserAvatar } from '../../../../utils/dataConfig';
import { AiOutlineEdit } from 'react-icons/ai';

interface IMoreOptions {
  setToggleOption: (toggle: boolean) => void;
  roomInfo: roomInfo;
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
          <Image src={roomInfo.roomAvatar} alt='avatar' layout='fill' />
        </S.RoomInfoAvatar>
        <S.RoomInfoName>
          {roomInfo.roomInfo.isGroup ? roomInfo.roomInfo.groupName : roomInfo.roomName}
          <S.RoomInfoNameEditIcon />
        </S.RoomInfoName>
      </S.RoomInfo>
      <S.NormalItem>Friend's profile</S.NormalItem>
      {!roomInfo.roomInfo.isGroup && <S.NormalItem>Change Nickname</S.NormalItem>}
      {roomInfo.roomInfo.isGroup && <S.NormalItem>Group Members</S.NormalItem>}
      <S.DeteleItem>Block</S.DeteleItem>
      <S.DeteleItem>Delete this chat</S.DeteleItem>
    </S.MoreOptions>
  );
};

export default MoreOptions;
