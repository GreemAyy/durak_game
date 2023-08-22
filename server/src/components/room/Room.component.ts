import socket from "../../connections/socket";
import { http } from "../../App";
import { Server } from "socket.io";
import { APIConnectGame, APICreateGame } from "./Room.method";
import E from 'events'
let IO: Server;

const events = new (E.EventEmitter)() 
process.setMaxListeners(0)

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
    socket.on("new", (msg) => {
      const data= JSON.parse(msg)
      events.emit('new',data)
    });
    events.on('new',data=>{
        socket.emit('new',data)
    })
  });
}

export default RoomComponent;
