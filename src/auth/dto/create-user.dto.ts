import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches, IsBoolean } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string

  @IsNotEmpty()
  last_name: string

  @IsEmail()
  email: string

  @IsOptional()
  phone?: string

  @MinLength(6)
  password: string

  @MinLength(6)
  confirmPassword: string

  @IsBoolean()
  acceptTerms: boolean
}
