import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import path from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';

import { DRepListParamsDto, DRepSort } from './drep.dto';
import {
  DRepListItemType,
  DRepStatus,
  DRepType,
  RawQueryDRepListItemType,
} from 'src/types/drep';

@Injectable()
export class DrepService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getVotingPower(drepId: string) {
    try {
      const sqlFilePath = path.join(
        __dirname,
        '../sql',
        'get-voting-power.sql',
      );
      const sql = fs.readFileSync(sqlFilePath, 'utf8');

      const result = await this.dataSource.query(sql, [drepId]);

      if (result.length === 0) {
        return 0;
      }

      return result[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async listDReps(query: DRepListParamsDto) {
    const sqlFilePath = path.join(__dirname, '../sql', 'list-dreps.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    const {
      page = 1,
      pageSize = 10,
      status = [],
      sort = DRepSort.Random,
      search = '',
    } = query;

    const countQuery = `SELECT COUNT(*) FROM (${sql}) AS filtered_dreps`;

    const totalResult = await this.dataSource.query<{ count: string }[]>(
      countQuery,
      [],
    );

    const total = parseInt(totalResult[0].count, 10);

    const result = await this.dataSource.query<RawQueryDRepListItemType[]>(
      `${sql} LIMIT $2 OFFSET $1`,
      [(page - 1) * pageSize, pageSize],
    );

    const elements = result.map(this.mapDRepListItem);

    return {
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      elements,
    };
  }

  private mapDRepListItem(dRep: RawQueryDRepListItemType): DRepListItemType {
    return {
      drepId: dRep.drep_id,
      view: dRep.view,
      isScriptBased: dRep.has_script,
      type:
        +dRep.latest_deposit >= 0
          ? dRep.url
            ? DRepType.DRep
            : DRepType.DirectVoter
          : dRep.has_non_deregister_voting_anchor
            ? DRepType.DRep
            : DRepType.DirectVoter,
      status:
        +dRep.deposit >= 0
          ? dRep.active
            ? DRepStatus.Active
            : DRepStatus.Inactive
          : DRepStatus.Retired,
      deposit: +dRep.deposit,
      votingPower: dRep.voting_power ? +dRep.voting_power : null,
      latestRegistrationDate: dRep.latest_registration_date,
      latestTxHash: dRep.latest_tx_hash,
      metadataError: dRep.metadata_error,
      metadataHash: dRep.metadata_hash,
      givenName: dRep.given_name,
      url: dRep.url,
    };
  }
}
