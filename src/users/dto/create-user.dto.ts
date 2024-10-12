import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUrl } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty({
    description: 'The unique GitHub ID of the user',
    example: 'user-github-id',
  })
  githubId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'The URL of the user\'s avatar',
    example: 'https://example.com/avatar.png',
  })
  avatar: string;
}
