<script lang="ts" setup>
import CardZone from '@/components/Game/CardZone.vue';
import PlayerCardBlock from '@/components/Game/PlayerCardBlock.vue';
import EnemyCardBlock from '@/components/Game/EnemyCardBlock.vue';
import Buttons from '@/components/Game/Buttons.vue';
import {queryGameMove, queryGameRound} from '../querys/Game.query'
import { _URL } from '@/constants';
import { Socket, io } from 'socket.io-client';
import { computed, onMounted ,reactive,ref, type Ref} from 'vue';
import { useRoute } from 'vue-router';
//@ts-ignore
import {useStore} from 'vuex'
import {queryConnectRoom} from '../querys/Room.query'
import {type IDeck, type IResDeck} from '../tools/interfaces'

const socket = io(_URL,{path:'/room'})
const route = useRoute()
const store = useStore()
const gameID = Number(route.params.id)
const userID = store.state.userStore.id
const gameSocket = ref<Socket>()
//@ts-ignore
const deck = ref<Ref<IResDeck>>({id:0,player_1_deck:[],player_2_deck:[],playzone_deck:[],remaining_deck:[],side:1,status:'',trump_card:'',history:[]})
const status = computed(()=>deck.value.status=='wait'?'wait':deck.value.status)
const access= ref(false)

onMounted(async()=>{
    const req = await queryConnectRoom(gameID,userID)
    if(req.responseText!='already') access.value=true
    const resText = req.responseText
    if(resText=='wait'||resText=='connected'){
        gameSocket.value = io(_URL,{path:'/game'})
        gameSocket.value.on('join',(msg)=>{
            if(msg) gameSocket.value?.emit('set',gameID)
        })
        gameSocket.value.on('set',(msg:IResDeck)=>{
            deck.value=msg
            const RM =deck.value.remaining_deck
            const p1 = deck.value.player_1_deck
            const p2 = deck.value.player_2_deck
            if(RM.length == 0){
                if(p1.length==0||p2.length==0){
                    gameSocket.value?.emit('end',gameID)}}
        })
        gameSocket.value.on('end',()=>
            gameSocket.value?.emit('set',gameID))
        gameSocket.value.emit('join',JSON.stringify(
            {gameID,type:resText}))
    }
})

const move=async()=>{
    const pickedCard=store.state.gameStore.pickedCard
    let playerDeck = pickedCard.side==1?deck?.value.player_1_deck:deck?.value.player_2_deck
    //@ts-ignore
    const gameZone:IDeck[][]=deck?.value.playzone_deck
    
    if(gameZone.length==0) gameZone.push([pickedCard.card])
    else if(gameZone[gameZone.length-1].length<2)
        gameZone[gameZone.length-1].push(pickedCard.card)  
    else gameZone.push([pickedCard.card])
    
    playerDeck=playerDeck.filter((_,index)=>index!=pickedCard.index)
    const total = {playerDeck,gamezone:gameZone,side:pickedCard.side,changeSide:pickedCard.changeSide,id:gameID}
    const req:any = await queryGameMove(total)
    if(req.status==200) gameSocket.value?.emit('set',gameID)
    store.commit('setCard',null)
}   
const end=async(data:any)=>{
    const req = await queryGameRound(data)
    //@ts-ignore
    if(req.status==200)
        gameSocket.value?.emit('set',gameID)
}
</script>

<template lang="pug">
.game-block(v-if="access")
    .game(v-if='status=="game"')
        EnemyCardBlock(:deck='deck')
        CardZone(@move='move' :deck='deck')
        PlayerCardBlock(:deck='deck')
        Buttons(@end='end' :deck='deck')
    .end(v-else-if="status=='end'") Игра окончена!
    .wait(v-else) Ждите игрока!
.no-access(v-else)  
    .no-access-header Это не ваша игра
    a.link-to-home(href='/home') Перейти обратно на главную страницу
</template>

<style lang="scss">
    .no-access-header{
        text-align: center;
    }
    .link-to-home{
        font-size: 25px;
        text-align: center;
    }
    .no-access{
        font-size: 50px;
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%,-50%);
    }
    .game{
        position: relative;
        transform:translate(0,3%);
        
    }
    .end{
        font-size: 50px;
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%,-50%);       
    }
    .wait{
        font-size: 50px;
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%,-50%);       
    }
</style>