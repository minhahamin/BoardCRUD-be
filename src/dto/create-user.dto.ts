import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'haha', description: '유저 이름' })
  username: string;

  @ApiProperty({ example: 'haha@email.com', description: '이메일 주소' })
  email: string;

  @ApiProperty({ example: '123456', description: '비밀번호' })
  password: string;
}
