export const queryGameSetMove=(datas:any)=>{
const data = datas.data
const PD=JSON.stringify(data.playerDeck)
const GZ = JSON.stringify(data.gamezone)
const CS = data.changeSide
if(data.side==1)
    return `UPDATE game SET player_1_deck='${PD}' ,playzone_deck='${GZ}' ,side='${CS}' WHERE id=${data.id}`
else 
    return `UPDATE game SET player_2_deck='${PD}' ,playzone_deck='${GZ}' ,side='${CS}' WHERE id=${data.id}`
}

export const queryGameSetRound=(datas:any)=>{
const p1 = JSON.stringify(datas.p1)
const p2 = JSON.stringify(datas.p2)
const d=JSON.stringify(datas.deck)
const id = datas.id
const side= datas.changeSide
return `UPDATE game set player_1_deck='${p1}',player_2_deck='${p2}',remaining_deck='${d}',playzone_deck='[]' ,side='${side}' WHERE id=${id}`
}


export const queryGameChangeStatus=(status:string,id:number|string)=>{
    return `UPDATE game set status='${status}' WHERE id=${id}`
}