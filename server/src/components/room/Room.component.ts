import socket from "../../connections/socket";
import { http } from "../../App";
import { Server } from "socket.io";
import { APIConnectGame, APICreateGame,APIGetGamesList, getGameByID } from "./Room.method";
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
    await APIGetGamesList()
}

async function roomSocket() {
  IO.on("connection", (socket) => {
    socket.on("new",async (msg) => {
      const data= JSON.parse(msg)
      const getGame = await getGameByID(data.gameID)
      IO.emit('new',getGame?.[0])
    });
  });
}

export default RoomComponent;
