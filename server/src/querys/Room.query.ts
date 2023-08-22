import { IDeck } from "../gameFunctions/createDeck"

export const queryRoomCheckInGame=(id:number|string)=>{
return  `SELECT id FROM game WHERE player_1_id=${id} and status ='game' OR player_1_id = ${id} and status ='wait' or player_2_id = ${id} and status ='wait' or player_2_id = ${id} and status ='game'`
}

export const queryRoomCreateGame=(id:number|string,deck:IDeck)=>{
const player1= JSON.stringify(deck.player1)
const player2= JSON.stringify(deck.player2)
const remaining = JSON.stringify(deck.remaining)
return `INSERT INTO  game (id, player_1_id, player_2_id, player_1_deck, player_2_deck, remaining_deck, playzone_deck, history, status, side, trump_card) VALUES (null,${id},0,'${player1}','${player2}','${remaining}','[]','[]','wait','1','${deck.trump}')`
}

export const queryRoomCheckStatus=(id:number|string)=>{
return "SELECT `id`, `player_1_id` , `player_2_id`, `status` FROM `game` WHERE id="+id
}

type Connect={
    gameID:number|string
    playerID:number|string
    status:string
    position:number
}

export const queryRoomConnect=(params:Connect)=>{
if(params.position==0)
return `UPDATE game SET status='${params.status}' WHERE id=${params.gameID}`
if(params.position==1)
return `UPDATE game SET player_1_id=${params.playerID} ,status='${params.status}' WHERE id=${params.gameID}`
if(params.position==2)
return `UPDATE game SET player_2_id=${params.playerID} ,status='${params.status}' WHERE id=${params.gameID}`
return ''
}
