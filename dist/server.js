"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const tslib_1 = require("tslib");
const http_1 = require("http");
const app_1 = tslib_1.__importDefault(require("./app"));
const config_1 = tslib_1.__importDefault(require("./config/config"));
const models_1 = tslib_1.__importDefault(require("./models"));
const socket_io_1 = require("socket.io");
// Sync the database and then start the server
const httpServer = (0, http_1.createServer)(app_1.default);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});
//socket io
exports.io.on("connection", (socket) => {
    console.log("New client connected");
    // Handle chat message event
    socket.on("chatMessage", (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all connected clients
        exports.io.emit("chatMessage", message);
    });
    // Handle disconnection event
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
models_1.default.sequelize
    .sync()
    .then(() => {
    httpServer.listen(config_1.default.port, () => {
        console.log(`Server is running on port ${config_1.default.port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
