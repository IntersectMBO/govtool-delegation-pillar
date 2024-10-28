import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import path from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';

import { DRepListParamsDto, DRepSort } from './drep.dto';
import { DRepListItemType, RawQueryDRepListItemType } from 'src/types/drep';

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
      [search, sort, status.length ? status : null],
    );

    const total = parseInt(totalResult[0].count, 10);

    const result = await this.dataSource.query<RawQueryDRepListItemType[]>(
      `${sql} LIMIT $5 OFFSET $4`,
      [
        search,
        sort,
        status.length ? status : null,
        Number((page - 1) * pageSize),
        Number(pageSize),
      ],
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
      dRepHash: dRep.drep_id,
      dRepView: dRep.view,
      isScriptBased: dRep.has_script,
      url: dRep.url,
      dataHash: dRep.data_hash,
      deposit: +dRep.deposit,
      votingPower: dRep.voting_power ? +dRep.voting_power : null,
      isActive: dRep.active,
      txHash: dRep.tx_hash,
      date: dRep.last_register_time,
      latestNonDeregisterVotingAnchorWasNotNull:
        dRep.has_non_deregister_voting_anchor,
      metadataError: dRep.fetch_error,
      paymentAddress: dRep.payment_address,
      givenName: dRep.given_name,
      objectives: dRep.objectives,
      motivations: dRep.motivations,
      qualifications: dRep.qualifications,
      imageUrl: dRep.image_url,
      imageHash: dRep.image_hash,
      type: dRep.type,
      status: dRep.status,
      latestDeposit: +dRep.latest_deposit,
    };
  }
}
