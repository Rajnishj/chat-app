import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId]
}
const userSocketMap = {}
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId
  if(userId != 'undefined') userSocketMap[userId] = socket.id

  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap))
  socket.on("disconnect", () => {
    delete userSocketMap[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    console.log("User disConnected", socket.id);
  });
});

//socket.on() is used to listen to the event. can be used both on client and server side

export { app, io, server };
