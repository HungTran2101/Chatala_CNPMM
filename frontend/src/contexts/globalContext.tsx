import React, { createContext, useContext, useState } from 'react';
import { messageType, registerType, roomType } from '../utils/types';

export type GlobalContent = {
  roomMsg: messageType[];
  setRoomMsg: (value: messageType[]) => void;
  roomInfo: roomType;
  setRoomInfo: (value: roomType) => void;
  registerInfo: registerType;
  setRegisterInfo: (value: registerType) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  roomMsg: [],
  setRoomMsg: () => {},
  roomInfo: { roomName: '', isGroup: false, users: [] },
  setRoomInfo: () => {},
  registerInfo: { name: '', email: '', password: '' },
  setRegisterInfo: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [roomMsg, setRoomMsg] = useState<messageType[]>([]);
  const [roomInfo, setRoomInfo] = useState<roomType>({
    roomName: '',
    isGroup: false,
    users: [],
  });
  const [registerInfo, setRegisterInfo] = useState<registerType>({
    name: '',
    email: '',
    password: '',
  });

  return (
    <GlobalContext.Provider
      value={{
        roomMsg,
        setRoomMsg,
        roomInfo,
        setRoomInfo,
        registerInfo,
        setRegisterInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
