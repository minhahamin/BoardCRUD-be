import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('users') // Swagger에서 그룹 이름
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회' })
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto.username, dto.email, dto.password);
  }
  @Post('login')
  @ApiOperation({ summary: '유저 로그인' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() dto: LoginUserDto) {
    return this.userService.validateUser(dto.username, dto.password);
  }
}
