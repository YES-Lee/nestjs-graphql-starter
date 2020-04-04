import { Module, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { groupProviders } from './group.providers';

@Module({
  providers: [
    ...groupProviders,
    GroupService,
    GroupResolver
  ],
  exports: [GroupResolver]
})
export class GroupModule {}
