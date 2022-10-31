export interface IUserRepository {
  getUsersByName(userName: string): Promise<any>;
}
