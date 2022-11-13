import Image from 'next/image';
import * as S from './TopBar.styled';
import React, { useEffect, useState } from 'react';
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
  const [activeFriendModal, setActiveFriendModal] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>();

  const getProfile = async () => {
    const result = await UsersApi.profile();
    setProfileData(result);
    sessionStorage.setItem('userId', result._id);
  };

  useEffect(() => {
    getProfile();
  }, []);

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
          <S.UserName>{profileData && profileData.name}</S.UserName>
        </S.LeftWrapper>
        <S.RightWrapper>
          <S.LogoContainer>
            <S.Logo>
              <Image src={Logo} alt='logo' />
            </S.Logo>
          </S.LogoContainer>
          <S.Search>
            <S.SearchIcon />
            <S.SearchInput
              placeholder='Search...'
              onClick={() => setActiveFriendModal(true)}
            />
            {activeFriendModal && (
              <NotiModal
                isFriendRequest={true}
                setActiveNotiModal={setActiveFriendModal}
              />
            )}
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
            phoneNumber={profileData.email}
            name={profileData.name}
            gender={profileData.gender}
            dob={profileData.dob}
            avatar={profileData.avatar}
            banner={profileData.banner}
            setUserInfoModal={setUserInfoModal}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
