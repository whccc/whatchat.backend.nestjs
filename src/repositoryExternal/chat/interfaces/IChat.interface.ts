export interface IChat {
  _id: string;
  idUser: string;
  chats: Array<IChats>;
  __v: number;
}

export interface IChats {
  idChat: string;
  members: Array<string>;
  messages: Array<{}>;
  typeChat: number;
}

export interface IChatsInfoMembers {
  idChat: string;
  members: Array<{
    idUnique: string;
    userName: string;
    picture: string;
  }>;
  messages: Array<{}>;
  typeChat: number;
}
