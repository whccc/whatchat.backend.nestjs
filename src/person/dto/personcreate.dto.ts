import { IsNotEmpty, IsNumber } from 'class-validator';

export class PersonCreateDto {
  public picture: string;
  @IsNumber()
  public phone: number;
  @IsNotEmpty()
  public comment: string;
}
