import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Inject } from '@nestjs/common';
import { LoginInput } from '../../graphql/schemas/user/login.input';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Resolver(() => UserEntity)
export class UserLoginResolver {

  @Inject(UserService)
  private userService: UserService;

  @Inject(AuthService)
  private authService: AuthService;

  @Mutation(returns => UserEntity, { description: '用户登录' })
  login(@Args('account') account: LoginInput): Promise<UserEntity> {
    return this.userService.login(account);
  }

  @ResolveField(() => String)
  token(@Parent() user: UserEntity) {
    return this.authService.sign({...user});
  }
}
