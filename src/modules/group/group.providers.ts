import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { GroupEntity } from '../../database/entities/group.entity';

export const GROUP_REPOSITORY = 'GROUP_REPOSITORY';

export const groupProviders: Provider[] = [
  {
    provide: GROUP_REPOSITORY,
    inject: ['ORM'],
    useFactory: (connection: Connection) => connection.getRepository(GroupEntity)
  }
];
