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
      page = 0,
      pageSize = 10,
      status = [],
      sort = DRepSort.Random,
      search = '',
    } = query;

    const statusArray = Array.isArray(status) ? status : [status];

    const countQuery = `SELECT COUNT(*) FROM (${sql}) AS filtered_dreps`;

    const totalResult = await this.dataSource.query<{ count: string }[]>(
      countQuery,
      [search, sort, statusArray.length ? statusArray : null],
    );

    const total = parseInt(totalResult[0].count, 10);

    const offset = page * pageSize;

    const result = await this.dataSource.query<RawQueryDRepListItemType[]>(
      `${sql} LIMIT $5 OFFSET $4`,
      [search, sort, statusArray.length ? statusArray : null, offset, pageSize],
    );

    const elements = result.map(this.mapDRepListItem);

    return {
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      elements,
    };
  }

  async getDRepInfo(drepId: string) {
    const sqlFilePath = path.join(__dirname, '../sql', 'get-drep-info.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    try {
      const result = await this.dataSource.query(sql, [drepId]);

      if (result.length === 0) {
        return null;
      }

      const [
        {
          has_script: isScriptBased,
          is_registed_as_drep: isRegisteredAsDRep,
          was_registered_as_drep: wasRegisteredAsDRep,
          is_registered_as_sole_voter: isRegisteredAsSoleVoter,
          was_registered_as_sole_voter: wasRegisteredAsSoleVoter,
          deposit,
          url,
          data_hash: dataHash,
          voting_power: votingPower,
          drep_register_tx: dRepRegisterTx,
          drep_retire_tx: dRepRetireTx,
          sole_voter_register_tx: soleVoterRegisterTx,
          sole_voter_retire_tx: soleVoterRetireTx,
          payment_address: paymentAddress,
          given_name: givenName,
          objectives,
          motivations,
          qualifications,
          image_url: imageUrl,
          image_hash: imageHash,
        },
      ] = result;

      return {
        isScriptBased,
        isRegisteredAsDRep: Boolean(isRegisteredAsDRep),
        wasRegisteredAsDRep: Boolean(wasRegisteredAsDRep),
        isRegisteredAsSoleVoter: Boolean(isRegisteredAsSoleVoter),
        wasRegisteredAsSoleVoter: Boolean(wasRegisteredAsSoleVoter),
        deposit,
        url,
        dataHash,
        votingPower,
        dRepRegisterTx,
        dRepRetireTx,
        soleVoterRegisterTx,
        soleVoterRetireTx,
        paymentAddress,
        givenName,
        objectives,
        motivations,
        qualifications,
        imageUrl,
        imageHash,
      };
    } catch (error) {
      console.error('Error executing getDRepInfo query:', error);
      return null;
    }
  }

  private mapDRepListItem(dRep: RawQueryDRepListItemType): DRepListItemType {
    return {
      drepId: dRep.drep_id,
      view: dRep.view,
      url: dRep.metadata_url,
      metadataHash: dRep.metadata_hash,
      deposit: +dRep.deposit,
      votingPower: +dRep.voting_power,
      status: dRep.status,
      latestTxHash: dRep.latest_tx_hash,
      latestRegistrationDate: dRep.latest_registration_date,
      metadataError: dRep.metadata_error,
      paymentAddress: dRep.payment_address,
      givenName: dRep.given_name,
      objectives: dRep.objectives,
      motivations: dRep.motivations,
      qualifications: dRep.qualifications,
      imageUrl: dRep.image_url,
      imageHash: dRep.image_hash,
      type: dRep.type,
    };
  }
}
