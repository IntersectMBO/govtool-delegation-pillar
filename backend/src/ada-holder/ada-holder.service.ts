import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import path from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';

@Injectable()
export class AdaHolderService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getCurrentDelegation(stakeKey: string) {
    try {
      const sqlFilePath = path.join(
        __dirname,
        '../sql',
        'get-current-delegation.sql',
      );
      const sql = fs.readFileSync(sqlFilePath, 'utf8');

      const result = await this.dataSource.query(sql, [stakeKey]);
      if (result.length === 0) {
        return null;
      }

      const [mDRepHash, dRepView, txHash] = result[0];

      return {
        dRepHash: mDRepHash,
        dRepView,
        txHash,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getVotingPower(stakeKey: string) {
    console.log('stakeKey', stakeKey);
    try {
      const sqlFilePath = path.join(
        __dirname,
        '../sql',
        'get-voting-power.sql',
      );
      const sql = fs.readFileSync(sqlFilePath, 'utf8');

      const result = await this.dataSource.query(sql, [stakeKey]);

      if (result.length === 0) {
        return 0;
      }

      return result[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
