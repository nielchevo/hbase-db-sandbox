import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HbaseService } from './hbase/hbase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly hbaseService: HbaseService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.hbaseService.testConnection();
    return this.appService.getHello();
  }
}
