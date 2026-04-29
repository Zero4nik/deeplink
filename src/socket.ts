import { Server } from "socket.io";


let io: Server | null = null;

export const initIo = (server: any) => {
  io = new Server(server, { cors: { origin: '*' } });
  return io;
};

export const getIo = () => {
  if (!io && process.env.NODE_ENV !== 'test') {
    throw new Error('Socket.IO not initialized');
  }

  if (!io && process.env.NODE_ENV === 'test') {
    return {
      to: () => ({
        emit: () => {} 
      })
    } as any;
  }
  return io;
};