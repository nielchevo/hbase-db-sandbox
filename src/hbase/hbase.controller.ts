import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HbaseService } from './hbase.service';

@Controller('hbase')
export class HbaseController {
  constructor(private readonly hbaseService: HbaseService) {}

  @Get('/get-table')
  async getTable(@Query('table_name') table: string) {
    return await this.hbaseService.scanTables(table);
  }

  @Get('/scan')
  async getScanRows(
    @Query('table_name') tableName: string,
    @Query('start_row') startRow: string,
    @Query('end_row') endRow: string,
  ) {
    const data = await this.hbaseService.fetchData(tableName, {
      startRow: startRow,
      endRow: endRow,
    });

    return data;
  }

  @Put('/create')
  async postUpdateData(@Body() body: any) {
    const { table, data } = body;
    const result = await this.hbaseService.putData(table, data);

    return result;
  }
}
