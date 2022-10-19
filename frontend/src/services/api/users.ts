import http from '../http'
// import {
//   IUser,
//   UpdatePasswordUserParams,
//   User,
//   UserListParams,
//   UserListResposne,
// } from '../types'
import { API_URL } from './urls'

// export const UsersApi = {
//   list: async function (params?: any): Promise<any> {
//     return await http.get(API_URL.login, { params: params })
//   },
//   detail: async function (username: string): Promise<any> {
//     return await http.get(${API_URL.users}${username}/)
//   },
//   me: async function (): Promise<User> {
//     return await http.get(${API_URL.users}me/)
//   },
//   update: async function (user: any): Promise<any> {
//     return await http.patch(${API_URL.users}${user.username}/, user)
//   },
//   create: async function (user: any): Promise<any> {
//     return await http.put(${API_URL.users}${user.username}/, user)
//   },
//   resetPassword: async function (
//     username: string,
//     data: UpdatePasswordUserParams
//   ): Promise<any> {
//     return await http.post(${API_URL.users}${username}/reset-password/, data)
//   },
// }
