import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRecommended() {
    const result = await this.appService.getRecommeneds();
    return result;
  }
}
