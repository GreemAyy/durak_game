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
