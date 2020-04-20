import { ArgsType, Field } from '@nestjs/graphql';
import { IPageArgs } from '../support/page.args';

@ArgsType()
export class UserListArgs extends IPageArgs {
  @Field(() => String, { description: '用户名', defaultValue: '' })
  username: string;
}
