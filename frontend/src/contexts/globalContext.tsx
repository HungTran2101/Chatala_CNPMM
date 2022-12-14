import React, { createContext, useContext, useState } from "react";
import {
  messageType,
  registerType,
  roomInfo,
} from "../utils/types";

export type GlobalContent = {
  roomList: roomInfo[];
  setRoomList: (value: roomInfo[]) => void;
  roomMsg: messageType[];
  setRoomMsg: (value: messageType[]) => void;
  roomInfo: roomInfo;
  setRoomInfo: (value: roomInfo) => void;
  registerInfo: registerType;
  setRegisterInfo: (value: registerType) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  roomList: [],
  setRoomList: () => {},
  roomMsg: [],
  setRoomMsg: () => {},
  roomInfo: {
    roomName: "",
    roomAvatar: "",
    roomInfo: {
      createdAt: "",
      groupName: "",
      isGroup: false,
      lastMsg: "",
      updatedAt: "",
      users: [],
      __v: 0,
      _id: "",
    },
  },
  setRoomInfo: () => {},
  registerInfo: { name: "", email: "", password: "" },
  setRegisterInfo: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [roomMsg, setRoomMsg] = useState<messageType[]>([]);
  const [roomInfo, setRoomInfo] = useState<roomInfo>({
    roomName: "-1",
    roomAvatar: "",
    roomInfo: {
      createdAt: "",
      groupName: "",
      isGroup: false,
      lastMsg: "",
      updatedAt: "",
      users: [],
      __v: 0,
      _id: "",
    },
  });
  const [registerInfo, setRegisterInfo] = useState<registerType>({
    name: "",
    email: "",
    password: "",
  });
  const [roomList, setRoomList] = useState<roomInfo[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        roomList,
        setRoomList,
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
