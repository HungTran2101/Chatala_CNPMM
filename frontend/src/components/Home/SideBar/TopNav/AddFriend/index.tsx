import Image from "next/image";
import { NotiListArray } from "../../../../../utils/dataConfig";
import * as S from "./AddFriend.styled";

interface IAddFriend {
  setToggleAddFriend: (toggle: boolean) => void;
}

const AddFriend = ({ setToggleAddFriend }: IAddFriend) => {
  return (
    <S.AddFriendModal>
      <S.AddFriendOverlay onClick={() => setToggleAddFriend(false)} />
      <S.AddFriendBody>
        <S.AddFriendSearch>
          <S.AddFriendSearchIcon />
          <S.AddFriendSearchInput placeholder="Search with name or phone number..." />
        </S.AddFriendSearch>
        {NotiListArray.map((data, index) => (
          <S.AddFriendItem key={index}>
            <S.AddFriendInfo>
              <S.AddFriendAvatar>
                <Image src={data.avatar} alt="avatar" />
              </S.AddFriendAvatar>
              <S.AddFriendNameWrapper>
                <S.AddFriendName>{data.name}</S.AddFriendName>
                <S.AddFriendNumFriend>{`${data.numFriends} Friends`}</S.AddFriendNumFriend>
              </S.AddFriendNameWrapper>
            </S.AddFriendInfo>
            <S.AddFriendOption>Add friend</S.AddFriendOption>
          </S.AddFriendItem>
        ))}
      </S.AddFriendBody>
    </S.AddFriendModal>
  );
};

export default AddFriend;
