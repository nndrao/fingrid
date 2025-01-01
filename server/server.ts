import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PositionService } from './services/PositionService';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const positionService = new PositionService();

// Track subscribed clients
const subscribedClients = new Set<string>();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle snapshot requests
  socket.on('USTY/SNAPSHOT', (callback) => {
    const positions = positionService.getAllPositions();
    callback(positions);
  });

  // Handle real-time updates subscription
  socket.on('subscribe', (topic) => {
    if (topic === 'USTY/UPDATES') {
      subscribedClients.add(socket.id);
      console.log(`Client ${socket.id} subscribed to updates`);
    }
  });

  socket.on('unsubscribe', (topic) => {
    if (topic === 'USTY/UPDATES') {
      subscribedClients.delete(socket.id);
      console.log(`Client ${socket.id} unsubscribed from updates`);
    }
  });

  socket.on('disconnect', () => {
    subscribedClients.delete(socket.id);
    console.log('Client disconnected:', socket.id);
  });
});

// Send updates every second to subscribed clients
setInterval(() => {
  if (subscribedClients.size > 0) {
    const updates = positionService.updateRandomPositions(10);
    io.to(Array.from(subscribedClients)).emit('USTY/UPDATES', updates);
  }
}, 1000);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});