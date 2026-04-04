"use client";

import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private readonly url: string;

  constructor() {
    // N-05 Fix: Properly handle environment variable
    this.url = process.env.NEXT_PUBLIC_API_URL || 'https://api.glitchzerolabs.com';
  }

  connect(): Socket {
    if (this.socket) return this.socket;

    this.socket = io(this.url, {
      reconnectionDelayMax: 10000,
      transports: ['websocket', 'polling'],
      withCredentials: true
    });

    this.socket.on('connect', () => {
      console.log('Socket connected to Nexus:', this.url);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
