import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('write')
export class WriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  picture?: string;

  @Column()
  authorUsername: string; // 작성자 정보 저장용 컬럼 추가
}
