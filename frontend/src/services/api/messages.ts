import http from '../http';
import { API_URL } from './urls';

type readyMessage = {
  roomId: String;
  msg: String;
  //   files: String;
};

export const messageApi = {
  sendMessage: async function (data: readyMessage): Promise<any> {
    return await http.post(API_URL.sendMessage, data);
  },
};
