import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsInt,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Match } from '../decorators/match.decorator'

export class CreateProfileDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  password: string

  @IsString()
  @Match('password')
  confirmPassword: string

  @Type(() => Number)
  @IsInt()
  profileTypeId: number
}
