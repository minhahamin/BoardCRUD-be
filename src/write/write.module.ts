import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriteEntity } from './write.entity';
import { WriteService } from './write.service';
import { WriteController } from './write.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WriteEntity])],
  controllers: [WriteController],
  providers: [WriteService],
  exports: [WriteService],
})
export class WritesModule {}
