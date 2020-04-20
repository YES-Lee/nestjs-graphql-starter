import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Inject } from '@nestjs/common';
import { LoginInput } from '../../graphql/schemas/user/login.input';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserResolver } from './user.resolver';
import { LoginResult } from '../../graphql/schemas/user/login.result';

@Resolver(() => LoginResult)
export class UserLoginResolver {

  @Inject(UserService)
  private userService: UserService;

  @Inject(UserResolver)
  private userResolver: UserResolver;

  @Inject(AuthService)
  private authService: AuthService;

  @Mutation(returns => LoginResult, { description: '用户登录' })
  async login(@Args('account') account: LoginInput): Promise<LoginResult> {
    const loginUser = await this.userService.login(account);
    const userInfo = await this.userResolver.getById(loginUser.id);
    return {
      token: this.authService.sign({...loginUser}),
      userInfo
    };
  }
}
