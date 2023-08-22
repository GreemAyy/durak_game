import {getCookiesAll} from '../../tools/cookie'

const cookies = getCookiesAll()


const userStore={
    state:()=>({
        id:cookies?.id?Number(cookies.id):null
    }),
    mutations:{

    }
}

export default userStore