import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Get()
  index() {
    return 'unauthorized';
  }
}
