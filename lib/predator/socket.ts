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
      // INSTITUTIONAL: Force the correct branded API URL
      const API_URL = 'https://api.glitchzerolabs.com';
      console.log('Connecting to Nexus API at:', API_URL);
      
      this.socket = io(API_URL, {
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'],
        withCredentials: true
      });

      this.socket.on('connect', () => {
        console.log('Nexus API WebSocket Connected:', this.socket?.id);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Nexus API WebSocket Error:', err.message);
      });

      this.socket.on('disconnect', () => {
        console.log('Nexus API WebSocket Disconnected');
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
