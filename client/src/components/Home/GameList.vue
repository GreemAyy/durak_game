<script lang="ts" setup>
import SingleGame from './SingleRoom.vue'
import { io } from 'socket.io-client';
import { _URL } from '../../constants.ts'
import {useStore} from 'vuex'
import {queryCreateRoom} from '../../querys/Room.query.ts'
import {reactive} from 'vue'

const socket = io(_URL,{path:'/room'})
const store =useStore()
const gameList = reactive([])

const create=async()=>{
    // if(store.state.userStore.id!=null){
    //     const req = await queryCreateRoom(store.state.userStore.id)
    //     if(req.status==200&&req.responseText=='created'){

    //     }
    // }
    socket.emit('new',
    JSON.stringify({gameID:0,userID:0}))
}

socket.on('new',msg=>{
    gameList.push(msg)
})
</script>

<template lang="pug">
.create-game(@click='create') Создать игру
.games-list
    SingleGame(v-for='item of gameList' :item='item')
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