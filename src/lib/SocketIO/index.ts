import { Server } from "socket.io";

export class IOHelper {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public broadcastNewMessage(message: any) {
    this.io.emit("newMessage", message);
  }

  public broadcastChatMessage(message: string) {
    this.io.emit("chatMessage", message);
  }

  public handleConnection(socket: any) {
    console.log("New client connected");

    // Handle chat message event
    socket.on("chatMessage", (message: string) => {
      console.log(`Received message: ${message}`);
      this.broadcastChatMessage(message);
    });

    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
}
