<script lang="ts" setup>
import CardZone from '@/components/Game/CardZone.vue';
import PlayerCardBlock from '@/components/Game/PlayerCardBlock.vue';
import EnemyCardBlock from '@/components/Game/EnemyCardBlock.vue';
import { _URL } from '@/constants';
import { Socket, io } from 'socket.io-client';
import { onMounted ,reactive,ref} from 'vue';
import { useRoute } from 'vue-router';
import {useStore} from 'vuex'
import {queryConnectRoom} from '../querys/Room.query'
import {type IResDeck} from '../tools/interfaces'

const socket = io(_URL,{path:'/room'})
const route=useRoute()
const store=useStore()
const gameID = Number(route.params.id)
const userID = store.state.userStore.id
const gameSocket = ref<Socket>()
const deck = ref<IResDeck>({id:0,player_1_deck:[],player_2_deck:[],playzone_deck:[],remaining_deck:[],side:1,status:'',trump_card:'',history:[]})
const status = ref<string>('wait')

onMounted(async()=>{
    const req = await queryConnectRoom(gameID,userID)
    const resText = req.responseText
    console.log(resText)
    if(resText=='wait'||resText=='connected'){
        gameSocket.value = io(_URL,{path:'/game'})
        gameSocket.value.on('join',(msg)=>{
            if(msg)
                gameSocket.value?.emit('set',gameID)
        })
        gameSocket.value.on('set',(msg:IResDeck)=>{
            status.value='connected'
            deck.value=msg
        })
        gameSocket.value.emit('join',JSON.stringify(
            {gameID,type:resText}
        ))
    }
})
</script>

<template lang="pug">
.game(v-if='status!="wait"')
    EnemyCardBlock(:deck='deck')
    CardZone(:deck='deck')
    PlayerCardBlock(:deck='deck')
.wait(v-else) wait
</template>

<script lang="scss">

</script>