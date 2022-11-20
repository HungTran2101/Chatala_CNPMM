export type messageSendType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: File[];
  unSend: boolean;
};

export type messageType = {
  roomId: string;
  fromSender: boolean;
  msg: string;
  files: { name: string; url: string; type: string }[];
  unSend: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type roomInfo = {
  roomName: string;
  roomAvatar: string;
  roomInfo: {
    createdAt: string;
    groupName: string;
    isGroup: boolean;
    lastMsg: { text: string; senderId: string | null };
    updatedAt: string;
    users: RoomUser[];
    __v: number;
    _id: string;
  };
};

export type RoomUser = {
  avatar: string;
  nickName: string;
  role: boolean;
  uid: string;
  _id: string;
  online: boolean;
};

// export type roomListType = {
//   roomName: string;
//   roomAvatar: string;
//   room: {
//     createdAt: string;
//     groupName: string;
//     isGroup: boolean;
//     lastMsg: string;
//     updatedAt: string;
//     users: RoomUser[];
//     __v: number;
//     _id: string;
//   };
// }[];

export type registerType = {
  name: string;
  email: string;
  password: string;
};
