import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  id: number;
  name: string;
  @IsNotEmpty()
  idUnique: string;
  phone: string;
  comment: string;
  file: string;
}
