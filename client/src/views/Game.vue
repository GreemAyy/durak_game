<script lang="ts" setup>
import { _URL } from '@/constants';
import { Socket, io } from 'socket.io-client';
import { onMounted ,ref} from 'vue';
import { useRoute } from 'vue-router';
import {useStore} from 'vuex'
import {queryConnectRoom} from '../querys/Room.query'

const socket = io(_URL,{path:'/room'})
const route=useRoute()
const store=useStore()
const gameID = Number(route.params.id)
const userID = store.state.userStore.id
const gameSocket = ref<Socket>()

onMounted(async()=>{
    const req = await queryConnectRoom(gameID,userID)
    const resText = req.responseText
    if(resText=='wait'||resText=='connected'){
        gameSocket.value = io(_URL,{path:'/game'})
        gameSocket.value.on('join',(msg)=>{
            console.log(msg)
        })
    }
    if(resText=='connected')
        // @ts-ignore
        gameSocket.value.emit('join',gameID)
    
    
})
</script>

<template lang="pug">
    
</template>

<script lang="scss">

</script>