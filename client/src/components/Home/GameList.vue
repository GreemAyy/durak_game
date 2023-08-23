<script lang="ts" setup>
import SingleGame from './SingleRoom.vue'
import {type IRes,type IRoom} from '../../tools/interfaces'
import { io } from 'socket.io-client';
import { _URL } from '../../constants'
import {useStore} from 'vuex'
import {queryCreateRoom, queryGetRoomsList} from '../../querys/Room.query'
import {reactive,onMounted,computed} from 'vue'

const socket = io(_URL,{path:'/room'})
const store =useStore()
const gameList = reactive<IRoom[]>([])
const have=computed(()=>{
    const id = store.state.userStore.id
    return !!gameList.filter(item=>item.player_1_id==id||item.player_2_id==id).length
})

onMounted(async()=>{
    const req =await queryGetRoomsList()
    if(req.status==200&&req?.result){
       gameList.push(...req?.result)
    }
})

const create=async()=>{
    if(store.state.userStore.id!=null){
        const req:IRes = await queryCreateRoom(store.state.userStore.id)
        if(req.status==200&&req.responseText=='created')
            socket.emit('new',JSON.stringify({gameID:req.gameID}))
        if(req.status==400&&req.responseText=='already')
            console.log('У вас уже есть созданная игра')
    } 
}

socket.on('new',async msg=>gameList.push(msg))
</script>

<template lang="pug">
.create-game( v-if='store.state.userStore.id!=null' @click='create') Создать игру
.games-list(v-if='gameList.length>0') {{gameList.length==0?'Нет начатых игр!':''}}
    SingleGame( v-for='item of gameList' 
                v-if='gameList.length>0'
                :have='have'
                :item='item')

</template>

<style lang="scss">
.create-game{
    font-size:30px;
    text-align:center;
    background:black;
    display:block;
    color:white;
    cursor:pointer;
}

.games-list{
    padding:10px;
    font-size:25px;
    width:50%;
    margin:0 auto;
}
</style>