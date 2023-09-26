import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsResolver } from './equipments.resolver';

@Module({
  providers: [EquipmentsResolver, EquipmentsService],
})
export class EquipmentsModule {}
