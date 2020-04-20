import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@ObjectType({
  description: '用户组',
})
@Entity({
  name: 'test_group', // 表名
})
export class GroupEntity extends BaseEntity {

  @Field({ description: '用户组名称' })
  @Column()
  name: string;

  @Field({ description: '备注', nullable: true })
  @Column()
  remark: string;
}
