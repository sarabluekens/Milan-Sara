import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { log } from 'console'
import { subscribe } from 'diagnostics_channel'
import { Server, Socket } from 'socket.io'
import { CasesService } from 'src/cases/cases.service'
import { CreateCaseInput } from 'src/cases/dto/create-case.input'
import { Case } from 'src/cases/entities/case.entity'
import { Event } from 'src/events/entities/event.entity'
@WebSocketGateway(+process.env.WS_PORT || 3004, {
  cors: {
    origin: [
      'http://localhost:3001',
      'http://localhost:5173',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(private readonly casesService: CasesService) {}

  @WebSocketServer()
  server: Server

  numberOfUsers: number = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }

  handleDisconnect(client: any) {
    this.numberOfUsers--
    this.server.emit('user disconnected')
    this.server.emit('number of users on this server: ', this.numberOfUsers)
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfUsers++
    this.server.emit('redcross:newuserconnected', {
      connectedUsers: this.numberOfUsers,
    })
    this.server.emit('user connected')
    this.server.emit('number of users on this server: ', this.numberOfUsers)
  }

  @SubscribeMessage('case:joined')
  async handleCaseJoined(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const caseId = data
      client.join(caseId)
      console.log('caregiver joined case', caseId)

      // return newCase
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('case:created')
  async handleNewCase(
    @MessageBody() data: Case,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const newCase = data
      console.log('newCase', newCase)
      this.server.emit('case:new', newCase) //<- create new listener for clients
      client.join(newCase.id)
      console.log('victim joined case', newCase.id)

      // return newCase
    } catch (error) {
      console.log(error)
    }

    console.log('rooms', client.rooms)
  }

  //
  @SubscribeMessage('coords:updated')
  async handleNewCoords(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      this.server.emit('coords:new', data) //<- create new listener for clients
      // this.server.emit('coords:new', data) //<- create new listener for clients
      // return newCase
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('event:created')
  async handleNewEvent(
    @MessageBody() data: Event,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const newEvent = data
      console.log('newEvent', newEvent)
      this.server.emit('event:new', newEvent) //<- create new listener for clients

      // return newEvent
    } catch (error) {
      console.log(error)
    }
  }
}
