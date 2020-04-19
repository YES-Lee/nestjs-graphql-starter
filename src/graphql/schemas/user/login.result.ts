import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '../../../database/entities/user.entity';

@ObjectType({
  description: '登录返回结果',
})
export class LoginResult extends UserEntity {
  @Field({ description: '登录认证令牌' })
  token: string;
}
