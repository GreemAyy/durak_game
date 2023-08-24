import ky from "ky"
import {_URL} from '../constants'

export const queryGameMove=async(total:any)=>{
    const req = await ky.post(_URL+'/api/game/move',{json:{data:total}})
    return await req.json()
}