import { Module, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { groupProviders } from './group.providers';
import { UserGroupModule } from '../user-group/user-group.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserGroupModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    ...groupProviders,
    GroupService,
    GroupResolver
  ],
  exports: [GroupResolver]
})
export class GroupModule {}
