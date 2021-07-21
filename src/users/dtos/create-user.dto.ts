import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  username: string;

  @Min(8)
  @Max(64)
  password: string;

  @IsNotEmpty()
  confirmation: string;
}
