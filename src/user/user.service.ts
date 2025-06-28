import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(username: string, email: string, plainPassword: string) {
    const saltRounds = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const user = this.userRepository.create({
      username,
      email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUserId(username);
    if (!user)
      throw new UnauthorizedException('존재하지 않는 유저아이디입니다.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    // JWT 토큰 생성
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: '로그인 성공',
      token,
      user: { id: user.id, username: user.username },
    };
  }
  async findByUserId(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
