console.clear()
import HTTP from "./connections/http";
import database from "./connections/DB";
import { DBC } from "../DBC";
import { defineComponents as components } from "./def";

const _PORT = Number(process.env.PORT)||4000

export const http= (()=>{
    const app = new HTTP()
    app.connect()
    return app})()
export const app = http.app
export const DB = (()=>{
    const DB = new database(DBC)
    DB.connect()
    return DB
})()

export const App=()=>{
    for(let component of components){
        component()
    }
}

http.http.listen(_PORT)


