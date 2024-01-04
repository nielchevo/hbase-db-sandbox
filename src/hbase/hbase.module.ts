import { Module } from '@nestjs/common';
import { HbaseService } from './hbase.service';
import { HbaseController } from './hbase.controller';

@Module({
  controllers: [HbaseController],
  imports: [],
  providers: [HbaseService],
  exports: [HbaseService],
})
export class HbaseModule {}
