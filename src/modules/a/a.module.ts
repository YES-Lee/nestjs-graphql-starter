import { Module } from '@nestjs/common';
import { AResolver } from './a.resolver';
import { AbResolver } from './ab.resolver';
import { BResolver } from './b.resolver';

@Module({
  providers: [AbResolver, AResolver, BResolver],
})
export class AModule {}
