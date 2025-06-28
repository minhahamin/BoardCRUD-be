import { ApiProperty } from '@nestjs/swagger';

export class CreateWriteDto {
  @ApiProperty({ example: 'Helloworld', description: '제목' })
  title: string;

  @ApiProperty({ example: '처음뵙겠습니다', description: '작성내용' })
  content: string;

  @ApiProperty({ example: '/src/img', description: '이미지' })
  picture?: string;

  @ApiProperty({ example: '로그인한 사람', description: '로그인한 사람'})
  authorusername?: string;
}
