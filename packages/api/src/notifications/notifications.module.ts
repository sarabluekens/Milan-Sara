import { Module } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
import { CasesModule } from 'src/cases/cases.module'

@Module({
  imports: [CasesModule],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
