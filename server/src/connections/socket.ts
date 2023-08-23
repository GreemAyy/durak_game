import {Server} from 'socket.io'
import http from 'http'

class socket{
    io!:Server
    http:http.Server
    constructor(http:http.Server,path?:string){
        this.http=http
        this.io = new Server(http,{path,cors:{'origin':'http://localhost:5173'}})
    }
}

export default socket