import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class RealtimeGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger = new Logger('Realtime');

  afterInit() { this.logger.log('WebSocket ready'); }
  handleConnection(c: Socket) { this.logger.log(`Connected ${c.id}`); }
  handleDisconnect(c: Socket) { this.logger.log(`Disconnected ${c.id}`); }

  emit(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }
}
