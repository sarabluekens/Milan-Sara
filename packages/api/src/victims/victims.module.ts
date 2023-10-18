import { Module } from '@nestjs/common';
import { VictimsService } from './victims.service';
import { VictimsResolver } from './victims.resolver';

@Module({
  providers: [VictimsResolver, VictimsService],
})
export class VictimsModule {}
