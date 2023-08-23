export interface IRes{
    status:number,
    responseText:string,
    result?:any[],
    gameID?:number
}

export interface IRoom{
    id:number
    player_1_id:number
    player_2_id:number
    status:string
}