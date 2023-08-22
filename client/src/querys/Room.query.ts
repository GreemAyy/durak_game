import ky from 'ky'
import { _URL } from '../constants'

export const queryCreateRoom=async(id:number)=>{
    const req = await ky.post(_URL+'/api/room/create'
        ,{json:{playerID:id}})
    const data = await req.json()
    return data
}