const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const path = require("path");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// socket.io connections
io.on('connection', (socket) => {
   
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", username + " has joined the group");
    });

    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", username + " has left the group");
    });

    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message);
    });

});


app.use(express.static(path.join(__dirname + "/public")));

server.listen(process.env.PORT || 3000, () => {console.log(`Server started at PORT ${process.env.PORT}`)});