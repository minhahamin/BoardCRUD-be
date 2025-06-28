import { Controller, Post, Body, Req, UseGuards, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WriteService } from './write.service';
import { CreateWriteDto } from 'src/dto/create-write.dto';
import { UpdateWriteDto } from 'src/dto/update-write.dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('writes')
@Controller('writes')
export class WriteController {
  constructor(private readonly writeService: WriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '게시글 작성 (JWT 인증 필요)' })
  @ApiBody({ type: CreateWriteDto })
  async createPost(@Req() req: any, @Body() createWriteDto: CreateWriteDto) {
    const username = req.user.username;
    return this.writeService.createPost(username, createWriteDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  async findAll() {
    return this.writeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 ID 게시글 조회' })
  @ApiParam({ name: 'id', description: '게시글 ID', type: 'number' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.writeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: '게시글 수정 (JWT 인증 필요, 작성자만 가능)' })
  @ApiParam({ name: 'id', description: '게시글 ID', type: 'number' })
  @ApiBody({ type: UpdateWriteDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() updateWriteDto: UpdateWriteDto,
  ) {
    const username = req.user.username;
    return this.writeService.update(id, username, updateWriteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제 (JWT 인증 필요, 작성자만 가능)' })
  @ApiParam({ name: 'id', description: '게시글 ID', type: 'number' })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const username = req.user.username;
    return this.writeService.remove(id, username);
  }
}
