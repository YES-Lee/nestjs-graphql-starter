import { ObjectType } from 'type-graphql';
import { UserEntity } from '../../../database/entities/user.entity';

@ObjectType({
  description: '用户信息',
})
export class UserDetailResult extends UserEntity {}
