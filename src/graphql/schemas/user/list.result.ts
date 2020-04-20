import { ObjectType, Field } from '@nestjs/graphql';
import { IPageResult } from '../support/page.result';
import { UserEntity } from '../../../database/entities/user.entity';

@ObjectType({
  description: '用户列表',
  /**
   * @important 这里的配置是必须的
   */
  implements: IPageResult,
})
export class UserListResult extends IPageResult<UserEntity> {
  @Field(type => [UserEntity])
  rows: UserEntity[];
}
