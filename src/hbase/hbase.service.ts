import * as hbase from 'hbase';
import { Injectable } from '@nestjs/common';

export interface ScanTableOption {
  startRow?: string;
  endRow?: string;
  columns?: string;
  batch?: string;
  maxVersions?: string;
  startTime?: string;
  endTime?: string;
  filter?: Record<string, any>;
}

@Injectable()
export class HbaseService {
  private _hbase = null;

  constructor() {
    this._hbase = new hbase({
      host: '127.0.0.1',
      port: 8080,
    });
  }

  async testConnection(): Promise<void> {
    if (this._hbase.connection instanceof hbase.Connection) {
      console.log('hbase connected');
    }
  }

  async getVersion(): Promise<any> {
    return new this._hbase.version((err, res) => {
      console.log(res);
      return res;
    });
  }

  async scanTables(tableName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hbase.table(tableName).scan({}, (err, res) => {
        if (err) {
          reject(err);
        }
        console.log(res);
        return resolve(res);
      });
    });
  }

  async fetchData(tableName: string, options?: ScanTableOption): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hbase.table(tableName).scan(options, (err, rows) => {
        if (err) reject(err);

        resolve(rows);
      });
    });
  }

  async putData(tableName: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hbase
        .table(tableName)
        .row(2)
        .put(
          [
            {
              column: 'personal_data:name',
              timestamp: Date.now(),
              $: 'niel',
            },
            {
              column: 'personal_data:email',
              timestamp: Date.now(),
              $: 'email@test.com',
            },
            {
              column: 'personal_data:name',
              timestamp: Date.now(),
              $: 'niel update',
            },
          ],
          (err, res) => {
            if (err) reject(err);

            resolve(res);
          },
        );
    });
  }
}
