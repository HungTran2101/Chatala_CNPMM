import Image from 'next/image';
import * as S from './TopBar.styled';
import React, { useState } from 'react';
import { UserAvatar, UserName } from '../../../utils/dataConfig';
import Logo from '../../../assets/imgs/LogoFullLong.png';
import UserInfo from './UserInfo';
import NotiModal from './NotiModal';
import { useGlobalContext } from '../../../contexts/globalContext';
import SettingsModal from './SettingsModal';
import { UsersApi } from '../../../services/api/users';

const TopBar = () => {
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [activeNotiModal, setActiveNotiModal] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);

  return (
    <S.Container>
      <S.Wrapper>
        <S.LeftWrapper onClick={() => setUserInfoModal(true)}>
          <S.Avatar>
            <Image
              src={UserAvatar}
              alt='avatar'
              layout='fill'
              objectFit='contain'
            />
          </S.Avatar>
          <S.UserName>{UserName}</S.UserName>
        </S.LeftWrapper>
        <S.RightWrapper>
          <S.LogoContainer>
            <S.Logo>
              <Image src={Logo} alt='logo' />
            </S.Logo>
          </S.LogoContainer>
          <S.Search>
            <S.SearchIcon />
            <S.SearchInput placeholder='Search...' />
          </S.Search>
          <S.Option>
            <S.OptionNotify onClick={() => setActiveNotiModal(true)} />
            {activeNotiModal && (
              <NotiModal setActiveNotiModal={setActiveNotiModal} />
            )}
            <S.OptionSetting onClick={() => setSettingVisible(true)} />
            {settingVisible && (
              <SettingsModal
                setSettingVisible={() => setSettingVisible(false)}
              />
            )}
            <S.OptionLogOut />
          </S.Option>
        </S.RightWrapper>
        {userInfoModal && (
          <UserInfo
            phoneNumber='+84 123456789'
            name={UserName}
            gender='male'
            dob='01/01/2001'
            avatar=''
            banner=''
            setUserInfoModal={setUserInfoModal}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
