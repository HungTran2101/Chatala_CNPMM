import http from "../http";
import { API_URL } from "./urls";



export const RoomApi = {
  getRoomList: async function (): Promise<any> {
    return await http.get(API_URL.getRoomList);
  },
  getRoomInfo: async function (roomId: string): Promise<any> {
    return await http.get(`${API_URL.getRoomInfo}/${roomId}`);
  },
};
