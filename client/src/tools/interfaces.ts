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

export interface IResDeck{
    id:number
    player_1_deck:IDeck[]
    player_2_deck:IDeck[]
    player_1_id:number
    player_2_id:number
    playzone_deck:IDeck[]
    remaining_deck:IDeck[]
    side:string|number
    status:string
    trump_card:string
    history:IDeck[]
}

export interface IDeck{sign:string,value:string|number}