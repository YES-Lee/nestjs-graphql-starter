import { IPageResult } from '../support/page.result';
import { ObjectType, Field } from 'type-graphql';
import { GroupEntity } from '../../../database/entities/group.entity';

@ObjectType({
  description: '用户组',
  implements: IPageResult
})
export class GroupListResult extends IPageResult<GroupEntity> {
  @Field(() => [GroupEntity])
  rows: GroupEntity[];
}
