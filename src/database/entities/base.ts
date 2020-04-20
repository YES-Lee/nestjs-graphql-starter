import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;
}
