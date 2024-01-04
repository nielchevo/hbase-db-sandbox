import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HbaseModule } from './hbase/hbase.module';

@Module({
  imports: [HbaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
