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
import { useRouter } from 'next/router';
import { SearchResult } from '../../../utils/types';
import SearchModal from './SearchModal';

const TopBar = () => {
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [activeNotiModal, setActiveNotiModal] = useState(false);
  const [activeFriendModal, setActiveFriendModal] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>();
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchModal, setSearchModal] = useState(false);
  const [action, setAction] = useState(false);
  const router = useRouter();
  const getProfile = async () => {
    const result = await UsersApi.profile();
    setProfileData(result);
    sessionStorage.setItem('userId', result._id);
  };

  const handleLogout = async () => {
    try {
      const result = await UsersApi.logout();
      if (result) {
        router.push('/login');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getSearchResult = async () => {
    if (searchInput) {
      try {
        const res = await UsersApi.userFind({ search: searchInput });
        setSearchResult(res.result);
        setSearchModal(true);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResult([]);
      setSearchModal(false);
    }
  };

  useEffect(() => {
    let t: any;
    if (!action) {
      t = setTimeout(() => {
        getSearchResult();
      }, 500);
    } else {
      getSearchResult();
      setAction(false);
    }
    return () => clearTimeout(t);
  }, [searchInput, action]);

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
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              onFocus={() => setSearchModal(true)}
            />
            {searchModal && searchInput && (
              <SearchModal
                setSearchModal={setSearchModal}
                searchResult={searchResult}
                setAction={setAction}
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
            <S.OptionLogOut onClick={() => handleLogout()} />
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
