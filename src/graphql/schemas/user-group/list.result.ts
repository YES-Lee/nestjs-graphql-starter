import { ObjectType, Field } from 'type-graphql';
import { IPageResult } from '../support/page.result';
import { UserGroupEntity } from '../../../database/entities/user-group.entity';

@ObjectType({
  description: '用户-用户组关系表列表',
  implements: IPageResult
})
export class UserGroupListResult extends IPageResult<UserGroupEntity> {
  @Field(() => [UserGroupEntity])
  rows: UserGroupEntity[];
}
