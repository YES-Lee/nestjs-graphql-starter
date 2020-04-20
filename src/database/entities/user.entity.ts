import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@ObjectType({
  description: '用户信息',
})
@Entity({
  name: 'test_user', // 表名
})
export class UserEntity extends BaseEntity {

  @Field({ description: '用户名' })
  @Column()
  username: string;

  @Field({ description: '昵称' })
  @Column()
  nickname: string;

  @Column()
  password: string;

  @Field(type => GenderEnum, { description: '性别' })
  @Column()
  gender: GenderEnum;
}
