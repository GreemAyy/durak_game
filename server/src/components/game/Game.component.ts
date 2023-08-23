import socket from "../../connections/socket"
import { Server } from "socket.io"
import { http } from "../../App";
import { getGame } from "./Game.method";
let IO:Server;

const GameComponent=async()=>{
    IO = (new socket(http.http, "/game")).io;
    await gameSocket()
}


async function gameSocket(){
    IO.on('connection',socket=>{
        socket.on('join',async(id:string)=>{
        socket.join(id)
        const req = await getGame(id)
        IO.to(id).emit('join',req)
        })
    })

}


export default GameComponent