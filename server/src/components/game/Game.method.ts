import { DB } from "../../App"

export const getGame=async(id:string|number)=>{
    const req= await DB.query('SELECT * FROM `game` WHERE id='+id)
    return req?.result[0]
}
