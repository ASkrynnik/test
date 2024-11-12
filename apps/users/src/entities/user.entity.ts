import { AbstractEntity } from '@app/shared/database/abstract.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('user')
  export class UserEntity extends AbstractEntity<UserEntity> {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }