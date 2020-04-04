import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { userProviders } from './user.providers';
import { UserLoginResolver } from './login.resolver';
import { UserGroupModule } from '../user-group/user-group.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    UserGroupModule,
    GroupModule
  ],
  providers: [
    ...userProviders,
    UserService,
    UserResolver,
    UserLoginResolver,
  ],
  controllers: [],
})
export class UserModule {}
