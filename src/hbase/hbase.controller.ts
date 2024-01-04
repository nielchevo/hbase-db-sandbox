import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HbaseService, ScanTableOption } from './hbase.service';

export class HbaseFilterParams implements ScanTableOption {}

@Controller('hbase')
export class HbaseController {
  constructor(private readonly hbaseService: HbaseService) {}

  @Get('/get-table')
  async getTable(@Query('table_name') table: string) {
    return await this.hbaseService.scanTables(table);
  }

  @Post('/scan')
  async getScanRows(
    @Query('table_name') tableName: string,
    @Body() body: Record<string, any>,
  ) {
    const { startTime, endTime } = body;

    const data = await this.hbaseService.fetchData(tableName, {
      ...body,
      startTime: startTime ? new Date(startTime).getTime() : null,
      endTime: endTime ? new Date(endTime).getTime() : null,
    });

    return data;
  }

  @Post('/create-table')
  async postCreateTable(@Body() body: any) {
    const { table, option, data } = body;

    const isCreated = await this.hbaseService.createTable(table, option);

    let result = isCreated;
    if (data.length > 0) {
      result = await this.hbaseService.putData(table, null, data);
    }

    return result;
  }

  @Put('/update-row')
  async putUpdateRow(@Body() body: any) {
    const { table, row, cells } = body;
    console.log(cells);
    const result = await this.hbaseService.putData(table, row, cells);

    return result;
  }
}
