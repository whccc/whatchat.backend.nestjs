export interface IChat {
  _id: string;
  idUser: string;
  chats: Array<{ idChat: string; members: Array<string> }>;
  __v: number;
}
