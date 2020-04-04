import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { USER_GROUP_REPO } from './user-group.providers';

@Injectable()
export class UserGroupService {

  @Inject(USER_GROUP_REPO)
  groupRepo: Repository<UserGroupEntity>;

  async listByUserId(userId: number, page = 1, pageSize = 10): Promise<{ count: number; rows: UserGroupEntity[] }> {
    const result = await this.groupRepo
      .createQueryBuilder('userGroup')
      .where('userGroup.user_id = :userId', { userId })
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getManyAndCount();
    return {
      count: result[1],
      rows: result[0]
    };
  }

}
