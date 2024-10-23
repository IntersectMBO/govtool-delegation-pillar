import { Module } from '@nestjs/common';
import { DrepController } from './drep.controller';
import { DrepService } from './drep.service';

@Module({
  controllers: [DrepController],
  providers: [DrepService],
})
export class DrepModule {}
