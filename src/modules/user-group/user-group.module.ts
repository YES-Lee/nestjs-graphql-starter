import { Module, forwardRef } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupResolver } from './user-group.resolver';
import { userGroupProviders } from './user-group.providers';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => GroupModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    ...userGroupProviders,
    UserGroupService,
    UserGroupResolver
  ],
  exports: [
    UserGroupResolver
  ]
})
export class UserGroupModule {}
