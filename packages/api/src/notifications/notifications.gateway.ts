import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CasesService } from 'src/cases/cases.service'
import { CreateCaseInput } from 'src/cases/dto/create-case.input'
import { Case } from 'src/cases/entities/case.entity'
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

  @SubscribeMessage('case:created')
  async handleNewCase(
    @MessageBody() data: CreateCaseInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Case> {
    console.log(data)
    try {
      const newCase = await this.casesService.create(data)
      this.server.emit('case:new', newCase) //<- create new listener for clients
      return newCase
    } catch (error) {
      console.log(error)
    }
  }
}
