import {getCookiesAll,setCookie} from '../../tools/cookie'
const cookies = getCookiesAll()

const userStore={
    state:()=>({
        id:cookies?.id?Number(cookies.id):null
    }),
    mutations:{
        setId(state,id){
            setCookie('id',id)
            state.id=id
        }
    }
}

export default userStore