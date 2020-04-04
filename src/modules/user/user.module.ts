import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { userProviders } from './user.providers';
import { UserLoginResolver } from './login.resolver';
import { UserGroupModule } from '../user-group/user-group.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    forwardRef(() => UserGroupModule),
    forwardRef(() => GroupModule)
  ],
  providers: [
    ...userProviders,
    UserService,
    UserResolver,
    UserLoginResolver,
  ],
  exports: [
    UserResolver
  ]
})
export class UserModule {}
