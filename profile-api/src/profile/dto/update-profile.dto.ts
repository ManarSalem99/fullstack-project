import { IsOptional, IsString, IsEmail, Matches, MinLength, IsInt } from 'class-validator'
import { Match } from '../decorators/match.decorator'

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  password?: string

  @IsOptional()
  @IsString()
  @Match('password')
  confirmPassword?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsInt()
  profileTypeId?: number
}
