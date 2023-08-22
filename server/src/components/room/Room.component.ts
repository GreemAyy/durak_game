import socket from "../../connections/socket";
import { http } from "../../App";
import { Server } from "socket.io";
import { APIConnectGame, APICreateGame } from "./Room.method";
let IO: Server;

async function RoomComponent() {
    IO = (new socket(http.http, "/room")).io;
    await roomRest();
    await roomSocket();
}

async function roomRest() {
    await APICreateGame()
    await APIConnectGame()
}

async function roomSocket() {
  IO.on("connection", (socket) => {
    socket.emit('message','hello!')
    socket.on("message", (msg) => {
      console.log(msg);
    });
  });
}

export default RoomComponent;
