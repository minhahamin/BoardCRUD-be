import { EntityRepository, Repository } from 'typeorm';
import { WriteEntity } from './write.entity';

@EntityRepository(WriteEntity)
export class WriteRepository extends Repository<WriteEntity> {}
