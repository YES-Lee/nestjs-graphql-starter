import { Injectable, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SystemInfoResult } from './graphql/schemas/system/info.result';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  systemInfo(): SystemInfoResult {
    return {
      version: this.configService.get('app.version'),
      env: process.env.NODE_ENV,
    };
  }
}
