import { IUser } from "../components/user/User.method";

export const queryUserCreate=(data:IUser)=>{
    return `INSERT INTO user (id, name, password, role) VALUES (null,'${data.name}','${data.password}','${data.role}')`
}