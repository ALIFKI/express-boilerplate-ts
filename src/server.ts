import { createServer } from "http";
import app from "./app";
import config from "./config/config";
import db from "./models";
import { Server, Socket } from "socket.io";
import { _ChatController } from "./controller/ChatController";
import { IOHelper } from "./lib/SocketIO";

// Sync the database and then start the server

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//socket io
io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  // Handle chat message event
  socket.on("chatMessage", (message: string) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit("chatMessage", message);
  });

  // Handle disconnection event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

db.sequelize
  .sync()
  .then(() => {
    httpServer.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
