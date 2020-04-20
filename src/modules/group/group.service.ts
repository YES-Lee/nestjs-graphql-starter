import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from '../../database/entities/group.entity';
import { GROUP_REPOSITORY } from './group.providers';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { GroupListArgs } from '../../graphql/schemas/group/list.args';

@Injectable()
export class GroupService {

  @Inject(GROUP_REPOSITORY)
  private groupRepo: Repository<GroupEntity>;

  getById(id: number): Promise<GroupEntity> {
    return this.groupRepo.findOne(id);
  }

  async listByUserId(userId: number, { page, pageSize, name }: GroupListArgs): Promise<GroupListResult> {
    const query = this.groupRepo
    .createQueryBuilder('group')
    .innerJoin(
      UserGroupEntity,
      'userGroup',
      'userGroup.group_id = group.id AND userGroup.user_id = :userId AND group.name LIKE :name',
      {
        userId,
        name: `%${name}%`
      }
    )
    .limit(pageSize)
    .offset(pageSize * (page - 1));

    const sql = query.getSql();
    const params = query.getQueryAndParameters()

    const [rows, count] = await query.getManyAndCount();
    return {
      count,
      rows
    };
  }

}
