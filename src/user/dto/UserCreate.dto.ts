import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Length(1, 50, { message: 'Digite un nombre.' })
  userName: string;
}
