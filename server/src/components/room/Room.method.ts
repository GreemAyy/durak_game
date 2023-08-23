import { generateDeck } from "../../gameFunctions/createDeck";
import { DB, app } from "../../App";
import {queryRoomCheckInGame,
        queryRoomCheckStatus,
        queryRoomConnect,
        queryRoomCreateGame
        } from "../../querys/Room.query";

export async function APICreateGame(){
    app.post('/api/room/create',async(req,res)=>{
        const playerID:number|string =req.body.playerID
        const checkUserHaveGame = await DB.query(queryRoomCheckInGame(playerID))
        if(await checkUserHaveGame.result?.length==0){
            const query = queryRoomCreateGame(playerID, await generateDeck())
            const createReq = await DB.query(query)
            res.send({status:200,responseText:'created',gameID:createReq.result.insertId})
        }
        else if(await checkUserHaveGame.result?.length>0)
            res.send({status:400,responseText:'already',gameID:checkUserHaveGame.result[0].id})
        else res.send({status:400,responceText:'error'})
    })
}

export async function APIGetGamesList(){
    app.get('/api/room/list',async(req,res)=>{
        const DBReq= await DB.query("SELECT `id`, `player_1_id`, `player_2_id`, `status` FROM `game` WHERE `status`='wait'")
        if(DBReq.result)
            res.send({status:200,responseText:'getted',result:DBReq.result})
        else
            res.send({status:400,responseText:'error'})
        })
}

export const getGameByID=async(id:number|string)=>{
    const DBReq= await DB.query('SELECT `id`, `player_1_id`, `player_2_id`, `status` FROM `game` WHERE id='+id)
    return DBReq.result
}

export async function APIConnectGame(){
    app.post('/api/room/connect',async(req,res)=>{
        const gameID= req.body.gameID
        const playerID = req.body.playerID;
        const checkStatus= await DB.query(queryRoomCheckStatus(gameID))
        const checkUserHaveGame = await DB.query(queryRoomCheckInGame(playerID))
        //  
        if(checkStatus.result &&checkUserHaveGame.result?.length==0){
            const result = checkStatus.result[0]
            if(result.status=='wait'&&
            (result['player_1_id']==playerID||result['player_2_id']==playerID))
               /*->*/ res.send({status:200,responseText:'already'})
            //
            else if(result.status=='wait'&&result['player_1_id']!=playerID){
                const query= queryRoomConnect({gameID,playerID,status:'game',position:2})
                const connect= await DB.query(query)
                res.send({status:connect.error?400:200,
                        responseText:connect.error?'error':'connected'})}
            //
            else if(result.status=='game'&&
            (result['player_1_id']!=playerID||result['player_2_id']!=playerID))
                /*->*/ res.send({status:400,responseText:'no'})
        }
        else if(checkUserHaveGame.result?.length>0)
                res.send({status:400,responseText:'already'})
        else res.send({status:404,responseText:'error'})
    })
}