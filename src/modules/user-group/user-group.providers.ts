import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserGroupEntity } from '../../database/entities/user-group.entity';

export const USER_GROUP_REPO = 'USER_GROUP_REPOSITORY';

export const userGroupProviders: Provider[] = [
  {
    provide: USER_GROUP_REPO,
    inject: ['ORM'],
    useFactory: (connection: Connection) => connection.getRepository(UserGroupEntity)
  }
];
