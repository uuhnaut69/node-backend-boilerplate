import { IsString, MinLength, MaxLength } from "class-validator";

export default class LoginRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  public readonly password: string;
}
