import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return this.socket;
  }

  subscribeToHospital(hospitalId: string, callback: (data: any) => void) {
    if (!this.socket) this.connect();
    
    this.socket?.emit('subscribe:hospital', { hospitalId });
    this.socket?.on('hospital:created', callback);
    this.socket?.on('hospital:updated', callback);
    this.socket?.on('beds:updated', callback);
    this.socket?.on('doctor:created', callback);
    this.socket?.on('doctor:updated', callback);
    this.socket?.on('readiness:updated', callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default new SocketService();
