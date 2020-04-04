import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from '../../database/entities/group.entity';
import { GROUP_REPOSITORY } from './group.providers';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { UserGroupEntity } from '../../database/entities/user-group.entity';

@Injectable()
export class GroupService {

  @Inject(GROUP_REPOSITORY)
  private groupRepo: Repository<GroupEntity>;

  getById(id: number): Promise<GroupEntity> {
    return this.groupRepo.findOne(id);
  }

  async listByUserId(userId: number, page = 1, pageSize = 10): Promise<GroupListResult> {
    const [rows, count] = await this.groupRepo
      .createQueryBuilder('group')
      .innerJoin(UserGroupEntity, 'userGroup', 'userGroup.group_id = group.id')
      .where('userGroup.user_id = :userId', { userId })
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .distinct()
      .getManyAndCount();
    return {
      count,
      rows
    };
  }

}
