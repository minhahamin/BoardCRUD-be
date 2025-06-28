import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WriteEntity } from './write.entity';
import { Repository } from 'typeorm';
import { CreateWriteDto } from '../dto/create-write.dto';
import { UpdateWriteDto } from '../dto/update-write.dto';


@Injectable()
export class WriteService {
  constructor(
    @InjectRepository(WriteEntity)
    private readonly writeRepository: Repository<WriteEntity>,
  ) {}

  async createPost(username: string, createWriteDto: CreateWriteDto) {
    const post = this.writeRepository.create({
      title: createWriteDto.title,
      content: createWriteDto.content,
      picture: createWriteDto.picture,
      authorUsername: username, // username 저장
    });
    await this.writeRepository.save(post);
    return post;
  }

  async findAll() {
    return this.writeRepository.find({
      order: {
        id: 'DESC', // 최신 게시글부터 정렬
      },
    });
  }

  async findOne(id: number) {
    const post = await this.writeRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`ID ${id}의 게시글을 찾을 수 없습니다.`);
    }
    return post;
  }

  async update(id: number, username: string, updateWriteDto: UpdateWriteDto) {
    const post = await this.writeRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException(`ID ${id}의 게시글을 찾을 수 없습니다.`);
    }
    
    // 작성자만 수정 가능
    if (post.authorUsername !== username) {
      throw new ForbiddenException('자신이 작성한 게시글만 수정할 수 있습니다.');
    }
    
    // 부분 업데이트
    Object.assign(post, updateWriteDto);
    
    await this.writeRepository.save(post);
    return post;
  }

  async remove(id: number, username: string) {
    const post = await this.writeRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException(`ID ${id}의 게시글을 찾을 수 없습니다.`);
    }
    
    // 작성자만 삭제 가능
    if (post.authorUsername !== username) {
      throw new ForbiddenException('자신이 작성한 게시글만 삭제할 수 있습니다.');
    }
    
    await this.writeRepository.remove(post);
    return { message: '게시글이 성공적으로 삭제되었습니다.' };
  }
}
