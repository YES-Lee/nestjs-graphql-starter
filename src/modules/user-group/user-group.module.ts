import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupResolver } from './user-group.resolver';
import { userGroupProviders } from './user-group.providers';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    GroupModule
  ],
  providers: [
    ...userGroupProviders,
    UserGroupService,
    UserGroupResolver
  ],
  exports: [UserGroupResolver]
})
export class UserGroupModule {}
