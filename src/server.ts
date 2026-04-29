import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initTo } from './socket';

const server = http.createServer(app);
const io = initTo(server)

io.on('connection', (socket) => {
  console.log(' Client connected:', socket.id);
  
  socket.on('join', (userId: string) => {
    socket.join(`user:${userId}`);
    console.log(` User ${userId} joined room`);
  });
  
  socket.on('disconnect', () => {
    console.log(' Client disconnected:', socket.id);
  });
});

(global as any).io = io;

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
