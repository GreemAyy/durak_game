import { DB } from "../../App";
import { app } from "../../App";
import { queryUserCreate } from "../../querys/User.query";

export interface IUser{
    name:string
    password:string
    role:string
}

export async function APICreateUser(){
    app.post('/api/user/create',async(req,res)=>{
        const body:IUser = req.body
        const create = await DB.query(queryUserCreate(body))
        if(create.result)
            res.send({status:200,responseText:'created',userID:create.result.insertId})
        else 
            res.send({status:400,responseText:'err'})
    })
}