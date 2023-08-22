import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

class HTTP{
    app!:express.Application
    port!:number
    http!:http.Server
    constructor(){}
    connect(){
        this.app=express()
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.http=http.createServer(this.app)
    }
}

export default HTTP