import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsUUID()
  roleId: string
}
