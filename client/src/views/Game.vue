<script lang="ts" setup>
import CardZone from '@/components/Game/CardZone.vue';
import PlayerCardBlock from '@/components/Game/PlayerCardBlock.vue';
import EnemyCardBlock from '@/components/Game/EnemyCardBlock.vue';
import {queryGameMove} from '../querys/Game.query'
import { _URL } from '@/constants';
import { Socket, io } from 'socket.io-client';
import { onMounted ,reactive,ref, type Ref} from 'vue';
import { useRoute } from 'vue-router';
//@ts-ignore
import {useStore} from 'vuex'
import {queryConnectRoom} from '../querys/Room.query'
import {type IDeck, type IResDeck} from '../tools/interfaces'

const socket = io(_URL,{path:'/room'})
const route=useRoute()
const store=useStore()
const gameID = Number(route.params.id)
const userID = store.state.userStore.id
const gameSocket = ref<Socket>()
//@ts-ignore
const deck = ref<Ref<IResDeck>>({id:0,player_1_deck:[],player_2_deck:[],playzone_deck:[],remaining_deck:[],side:1,status:'',trump_card:'',history:[]})
const status = ref<string>('wait')

onMounted(async()=>{
    const req = await queryConnectRoom(gameID,userID)
    const resText = req.responseText
    if(resText=='wait'||resText=='connected'){
        gameSocket.value = io(_URL,{path:'/game'})
        gameSocket.value.on('join',(msg)=>{
            if(msg)
                gameSocket.value?.emit('set',gameID)
        })
        gameSocket.value.on('set',(msg:IResDeck)=>{
            status.value='connected'
            //@ts-ignore
            deck.value=msg
        })
        gameSocket.value.emit('join',JSON.stringify(
            {gameID,type:resText}
        ))
    }
})

const move=async()=>{
    const pickedCard=store.state.gameStore.pickedCard
    let playerDeck = pickedCard.side==1?deck?.value.player_1_deck:deck?.value.player_2_deck
    //@ts-ignore
    const gameZone:IDeck[][]=deck?.value.playzone_deck
    if(gameZone.length==0)
        gameZone.push([pickedCard.card])
    else if(gameZone[gameZone.length-1].length<2)
        gameZone[gameZone.length-1].push(pickedCard.card)  
    else gameZone.push([pickedCard.card])
    playerDeck=playerDeck.filter((_,index)=>index!=pickedCard.index)
    const total = {playerDeck,gamezone:gameZone,side:pickedCard.side,changeSide:pickedCard.changeSide,id:gameID}
    const req:any= await queryGameMove(total)
    if(req.status==200)
        gameSocket.value?.emit('set',gameID)
}   
</script>

<template lang="pug">
.game(v-if='status!="wait"')
    EnemyCardBlock(:deck='deck')
    CardZone(
        @move='move'
        :deck='deck')
    PlayerCardBlock(:deck='deck')
.wait(v-else) wait
</template>

<script lang="scss">

</script>