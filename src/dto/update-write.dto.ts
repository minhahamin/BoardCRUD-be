import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWriteDto {
  @ApiProperty({ example: '수정된 제목', description: '제목', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: '수정된 내용', description: '작성내용', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: '/src/img', description: '이미지', required: false })
  @IsOptional()
  @IsString()
  picture?: string;
} 