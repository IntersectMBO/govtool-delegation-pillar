import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdaHolderService } from './ada-holder.service';

@ApiTags('ada-holder')
@Controller('ada-holder')
export class AdaHolderController {
  constructor(private adaHolderService: AdaHolderService) {}

  @Get('get-current-delegation/:stakeKey')
  @ApiOperation({ summary: 'Get current delegation of a stake key' })
  @ApiQuery({ name: 'stakeKey', type: 'string', required: true })
  async getCurrentDelegation(@Query('stakeKey') stakeKey: string) {
    return this.adaHolderService.getCurrentDelegation(stakeKey);
  }

  @Get('get-voting-power/:stakeKey')
  @ApiOperation({ summary: 'Get voting power of a stake key' })
  @ApiQuery({ name: 'stakeKey', type: 'string', required: true })
  async getVotingPower(@Query('stakeKey') stakeKey: string) {
    return this.adaHolderService.getVotingPower(stakeKey);
  }
}
