export type messageSendType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: File[];
  unSend: boolean;
};

export type messageType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: { name: string, url: string; type: string }[];
  unSend: boolean;
  deleted: boolean;
};

export type roomType = {
  roomName: string;
  isGroup: boolean;
  users: { avatar: string; role: boolean; name: string }[];
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};
