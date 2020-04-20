import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '../../../database/entities/user.entity';

@ObjectType({
  description: '用户登录返回结果'
})
export class LoginResult {
  @Field(() => String)
  token: string;

  @Field(() => UserEntity, { description: '用户信息' })
  userInfo: UserEntity;
}
