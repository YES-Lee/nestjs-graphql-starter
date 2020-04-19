import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType({
  description: '用户信息',
})
@Entity({
  name: 'test_user', // 表名
})
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field()
  @Column({ type: 'datetime' })
  created_at: Date;

  @Field()
  @Column({ type: 'datetime' })
  updated_at: Date;

  @Field()
  @Column({ type: 'datetime' })
  deleted_at: Date;
}
