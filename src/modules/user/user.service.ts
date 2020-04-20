import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../../database/entities/user.entity';
import { LoginInput } from '../../graphql/schemas/user/login.input';
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

  async login(account: LoginInput): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ username: account.username, password: account.password });
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    return user;
  }

  getCurrent(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  async getUserList({ page, pageSize, username }: UserListArgs): Promise<UserListResult> {
    const [rows, count] = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username LIKE :username', { username: `%${username}%` })
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getManyAndCount();

    return {
      count,
      rows
    };
  }

  getById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }
}
