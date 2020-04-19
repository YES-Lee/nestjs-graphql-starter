import { ArgsType } from '@nestjs/graphql';
import { IPageArgs } from '../support/page.args';

@ArgsType()
export class UserListArgs extends IPageArgs {}
