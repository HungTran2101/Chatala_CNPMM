
export type messageType = {
  roomId: string,
  senderId: string,
  msg: string,
  imgs: Array<string>,
  files: Array<string>,
  unSend: boolean,
}