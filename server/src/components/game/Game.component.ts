import socket from "../../connections/socket"
import { Server } from "socket.io"
import { http } from "../../App";
import { endGame, endRoundGame, getGame, moveGame } from "./Game.method";
let IO:Server;

const GameComponent=async()=>{
    IO = (new socket(http.http, "/game")).io;
    await gameSocket()
    await moveGame()
    await endRoundGame()
}

async function gameSocket(){
    IO.on('connection',socket=>{
        socket.on('join',async(data:string)=>{
            const parse = JSON.parse(data)
            socket.join(parse.gameID)
            IO.to(parse.gameID).emit('join',parse.type=='wait'?false:true)
        })
        socket.on('end',async(id:string|number)=>{
            const req = await endGame(id)
            IO.to(String(id)).emit('end')
        })
        socket.on('set',async(id:string)=>{
            const req = await getGame(id)
            IO.to(id).emit('set',req)
        })
    })
}

export default GameComponent