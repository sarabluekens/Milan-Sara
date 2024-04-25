import { Module } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
import { CasesModule } from 'src/cases/cases.module'
import { EventsModule } from 'src/events/events.module'

@Module({
  imports: [CasesModule, EventsModule],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
