export interface IUserRepository {
  getUsersByName(userName: string): Promise<any>;
  getUsersByIdUnique(usersIdUnique: Array<string>): Promise<any>;
}
