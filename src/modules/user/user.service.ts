import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../../database/entities/user.entity';
import { GenderEnum } from '../../enums/gender.enum';
import { LoginInput } from '../../graphql/schemas/user/login.input';
import { LoginResult } from '../../graphql/schemas/user/login.result';
import { UserListArgs } from '../../graphql/schemas/user/list.args';
import { UserListResult } from '../../graphql/schemas/user/list.result';
import { USER_REPO } from './user.providers';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @Inject(USER_REPO) private userRepo: Repository<UserEntity>
  ) {}

  async login(account: LoginInput): Promise<LoginResult> {
    const user = await this.userRepo.findOne({ username: account.username, password: account.password });
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    const token = this.authService.sign({...user});
    return {
      ...user,
      token,
    };
  }

  getCurrent(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  async getUserList(data: UserListArgs): Promise<UserListResult> {
    const [rows, count] = await this.userRepo
      .createQueryBuilder()
      .limit(data.pageSize)
      .offset((data.page - 1) * data.pageSize)
      .getManyAndCount();

    return {
      count,
      rows
    };
  }
}
