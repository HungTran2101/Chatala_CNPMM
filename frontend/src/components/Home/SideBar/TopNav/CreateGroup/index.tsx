import Image from 'next/image';
import { useEffect } from 'react';
import { UsersApi } from '../../../../../services/api/users';
import { NotiListArray } from '../../../../../utils/dataConfig';
import * as S from './CreateGroup.styled';

interface ICreateGroup {
  setToggleCreateGroup: (toggle: boolean) => void;
}

const CreateGroup = ({ setToggleCreateGroup }: ICreateGroup) => {
  useEffect(() => {
    UsersApi.getFriends().then(res => {
      console.log(res);
    });
  });

  return (
    <S.CreateGroupModal>
      <S.CreateGroupOverlay onClick={() => setToggleCreateGroup(false)} />
      <S.CreateGroupBody>
        <S.CreateGroupTitle>Creating Group Chat</S.CreateGroupTitle>
        <S.CreateGroupSearch>
          <S.CreateGroupSearchIcon />
          <S.CreateGroupSearchInput placeholder='Search with name or phone number...' />
        </S.CreateGroupSearch>
        {NotiListArray.map((data, index) => (
          <S.CreateGroupItem key={index}>
            <S.CreateGroupInfo>
              <S.CreateGroupAvatar>
                <Image src={data.avatar} alt='avatar' layout='fill' />
              </S.CreateGroupAvatar>
              <S.CreateGroupName>{data.name}</S.CreateGroupName>
            </S.CreateGroupInfo>
            <S.CreateGroupOption>Add</S.CreateGroupOption>
          </S.CreateGroupItem>
        ))}
      </S.CreateGroupBody>
    </S.CreateGroupModal>
  );
};

export default CreateGroup;
