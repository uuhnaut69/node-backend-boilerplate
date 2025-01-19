import { IsString, IsNotEmpty } from "class-validator";

export default class RefreshTokenRequest {
  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;
}
