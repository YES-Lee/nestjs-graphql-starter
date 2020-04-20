import { IPageArgs } from '../support/page.args';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GroupListArgs extends IPageArgs {
  @Field(() => String, { description: '用户组名称', defaultValue: '' })
  name: string;
}
