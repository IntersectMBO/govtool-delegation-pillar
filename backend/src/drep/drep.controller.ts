import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DrepService } from './drep.service';
import { DRepListParamsDto } from './drep.dto';

@ApiTags('drep')
@Controller('drep')
export class DrepController {
  constructor(private drepService: DrepService) {}

  @Get('get-voting-power/:drepId')
  @ApiOperation({ summary: 'Get voting power of a drep id' })
  @ApiQuery({ name: 'drepId', type: 'string', required: true })
  async getVotingPower(@Query('drepId') drepId: string) {
    return this.drepService.getVotingPower(drepId);
  }

  @Get('list')
  @ApiOperation({ summary: 'Get a list of DReps' })
  @ApiQuery({
    name: 'sort',
    enum: ['Random', 'VotingPower', 'RegistrationDate', 'Status'],
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: ['Active', 'Inactive', 'Retired'],
    required: false,
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'pageSize', type: 'number', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of DReps',
    example: {
      page: 0,
      pageSize: 10,
      total: 100,
      elements: [
        {
          drepId: '123',
          view: 'drep123',
          isScriptBased: false,
          type: 'DRep',
          status: 'Active',
          deposit: 100,
          votingPower: 100,
          latestRegistrationDate: '2021-01-01',
          latestTxHash:
            '7c8c6c4720c5e83b00f065d62b366f20c8c309f376a55a202b1fc5f114c2fba1',
          metadataError: null,
          metadataHash: null,
          givenName: 'DREP123',
          url: 'https://example.com',
        },
      ],
    },
  })
  async getDRepList(@Query() query: DRepListParamsDto) {
    return this.drepService.listDReps(query);
  }
}
