import ky from "ky"
import {_URL} from '../constants'

export const queryCreateUser=async(name:string,password:string,role:string)=>{
    const req = await ky.post(_URL+'/api/user/create',{
        json:({name,password,role})
    })
    const data = await req.json()
    return data
}