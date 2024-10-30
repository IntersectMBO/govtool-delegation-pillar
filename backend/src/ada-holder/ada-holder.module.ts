import { Module } from '@nestjs/common';
import { AdaHolderController } from './ada-holder.controller';
import { AdaHolderService } from './ada-holder.service';

@Module({
  controllers: [AdaHolderController],
  providers: [AdaHolderService],
})
export class AdaHolderModule {}
