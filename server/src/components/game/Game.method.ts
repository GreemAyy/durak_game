import { DB, app } from "../../App"
import { queryGameSetMove } from "../../querys/Game.query"

export const getGame=async(id:string|number)=>{
    const req= await DB.query('SELECT * FROM `game` WHERE id='+id)
    return req?.result[0]
}

export const moveGame=async()=>{
    app.post('/api/game/move',async(req,res)=>{
        const queryStr=queryGameSetMove(req.body)
        const setMove= await DB.query(queryStr)
        if(setMove?.result)
            res.send({status:200,responseText:'succsess'})
        else 
            res.send({status:400,responseText:'error'})

    })
}
