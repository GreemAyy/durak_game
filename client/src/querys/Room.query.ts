import ky from 'ky'
import { _URL } from '../constants'
import { type IRes } from '../tools/interfaces'

export const queryCreateRoom=async(id:number):Promise<IRes>=>{
    const req = await ky.post(_URL+'/api/room/create'
        ,{json:{playerID:id}})
    return await req.json()
}

export const queryGetRoomsList=async():Promise<IRes>=>{
    const req = await ky.get(_URL+'/api/room/list')
    return await req.json()
}