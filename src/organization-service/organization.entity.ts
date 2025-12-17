// src/organization/organization.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('organization') // 데이터베이스의 'organization' 테이블에 매핑됩니다.
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // code: 조직 식별자 (영어), NOT NULL, UNIQUE
  @Column({ type: 'varchar', length: 64, unique: true })
  code: string;

  // createdAt: 생성 시간
  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
