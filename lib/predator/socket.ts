import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): Socket {
    if (!this.socket) {
      this.socket = io('$PUBLIC_API', {
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('Nexus API Connected:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Nexus API Disconnected');
      });
    }
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = SocketService.getInstance();
