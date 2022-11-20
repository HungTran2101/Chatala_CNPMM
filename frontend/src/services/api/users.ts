import http from '../http';
// import {
//   IUser,
//   UpdatePasswordUserParams,
//   User,
//   UserListParams,
//   UserListResposne,
// } from '../types'
import { API_URL } from './urls';

type User = {
    name: string;
    email: string;
    password: string;
};

type UserLogin = {
  email: string;
  password: string;
};

type UserUpdateProfile = {
  name: string;
  gender: string;
  dob: string | Date;
  avatar: string;
};

export const UsersApi = {
    register: async function (user: User): Promise<any> {
        return await http.post(API_URL.register, user);
    },
    otpRegister: async function (otp: string): Promise<any> {
        return await http.post(API_URL.otpRegister, otp);
    },
    login: async function (data: UserLogin): Promise<any> {
        return await http.post(API_URL.login, data);
    },
    logout: async function (): Promise<any> {
        return await http.post(API_URL.logout);
    },
    profile: async function (): Promise<any> {
        return await http.get(API_URL.profile);
    },
    updateProfile: async function (data: UserUpdateProfile): Promise<any> {
        return await http.post(API_URL.updateProfile, data)
    },
      changePassword: async function (oldPassword: string, newPassword: string): Promise<any> {
        return await http.post(API_URL.changePassword, {oldPassword, newPassword})
      },
    //   me: async function (): Promise<User> {
    //     return await http.get(${API_URL.users}me/)
    //   },
    //   update: async function (user: any): Promise<any> {
    //     return await http.patch(${API_URL.users}${user.username}/, user)
    //   },
    //   resetPassword: async function (
    //     username: string,
    //     data: UpdatePasswordUserParams
    //   ): Promise<any> {
    //     return await http.post(${API_URL.users}${username}/reset-password/, data)
    //   },
}
