import { Module } from '@nestjs/common'
import { UsedMaterialsService } from './used-materials.service'
import { UsedMaterialsResolver } from './used-materials.resolver'
import { UsedMaterial } from './entities/used-material.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([UsedMaterial])],
  providers: [UsedMaterialsResolver, UsedMaterialsService],
  exports: [UsedMaterialsService],
})
export class UsedMaterialsModule {}
