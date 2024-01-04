import * as hbase from 'hbase';
import { Injectable } from '@nestjs/common';

export interface ScanTableOption {
  startRow?: string;
  endRow?: string;
  column?: string[];
  batch?: string;
  maxVersions?: string;
  startTime?: any;
  endTime?: any;
  filter?: Record<string, any>;
}

export interface TableOption {
  IS_META?: boolean;
  IS_ROOT?: boolean;
  ColumnSchema?: Array<Record<any, string>>;
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
    return new Promise((resolve, reject) => {
      this._hbase.version((err, res) => {
        if (err) reject(err);
        return resolve(res);
      });
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

  async createTable(tableName: string, tableOption?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hbase.table(tableName).create(tableOption, (err, res) => {
        if (err) {
          reject(err);
        }

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

  async putData(tableName: string, rowKey: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._hbase
        .table(tableName)
        .row(rowKey)
        .put(data, (err, res) => {
          if (err) reject(err);

          resolve(res);
        });
    });
  }
}
