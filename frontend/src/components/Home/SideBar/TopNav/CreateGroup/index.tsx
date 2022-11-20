import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UsersApi } from '../../../../../services/api/users';
import { NotiListArray } from '../../../../../utils/dataConfig';
import * as S from './CreateGroup.styled';

interface ICreateGroup {
  setToggleCreateGroup: (toggle: boolean) => void;
}

const CreateGroup = ({ setToggleCreateGroup }: ICreateGroup) => {
  const [listFriends, setListFriends] = useState<any>([]);

  useEffect(() => {
    UsersApi.getFriends().then(res => {
      console.log(res);
      setListFriends(res);
    });
  }, []);

  const [listMembers, setListMenbers] = useState<any>([]);

  const handleAdd = (id: any, name: any, avatar: any) => {
    const newMember = { id: id, name: name, avatar: avatar };
    setListMenbers((listMembers: any) => [...listMembers, newMember]);
  };

  const handleCreate = () => {
    UsersApi.createGroup(listMembers).then(res => {
      console.log(res);
    });
  };

  return (
    <S.CreateGroupModal>
      <S.CreateGroupOverlay onClick={() => setToggleCreateGroup(false)} />
      <S.CreateGroupBody>
        <S.CreateGroupTitle>Creating Group Chat</S.CreateGroupTitle>
        <S.CreateGroupSearch>
          <S.CreateGroupSearchIcon />
          <S.CreateGroupSearchInput placeholder='Search with name or phone number...' />
        </S.CreateGroupSearch>
        {listFriends.map((data: any, index: number) => (
          <S.CreateGroupItem key={index}>
            <S.CreateGroupInfo>
              <S.CreateGroupAvatar>
                <Image src={data.avatar} alt='avatar' layout='fill' />
              </S.CreateGroupAvatar>
              <S.CreateGroupName>{data.name}</S.CreateGroupName>
            </S.CreateGroupInfo>
            <S.CreateGroupOption
              onClick={() => handleAdd(data._id, data.name, data.avatar)}
            >
              Add
            </S.CreateGroupOption>
          </S.CreateGroupItem>
        ))}
        <div>
          {listMembers.map((data: any, index: number) => (
            <div key={index}>{data.name}</div>
          ))}
        </div>
        <button onClick={() => handleCreate()}>Create</button>
      </S.CreateGroupBody>
    </S.CreateGroupModal>
  );
};

export default CreateGroup;
