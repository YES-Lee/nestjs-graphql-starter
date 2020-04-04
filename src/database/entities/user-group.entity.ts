import { ObjectType, Field, Int } from 'type-graphql';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@ObjectType({
  description: '用户组',
})
@Entity({
  name: 'test_user_group', // 表名
})
export class UserGroupEntity extends BaseEntity {

  @Field(() => Int)
  @Column({ name: 'user_id'})
  userId: number;

  @Field(() => Int)
  @Column({ name: 'group_id' })
  groupId: number;

  @Field({ description: '备注' })
  @Column()
  remark: string;
}
