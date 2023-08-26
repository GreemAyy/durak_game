<script lang="ts" setup>
import type { IDeck, IRes, IResDeck } from '@/tools/interfaces';
import { computed, onMounted, type ComputedRef } from 'vue';
//@ts-ignore
import {useStore} from 'vuex'

interface IProps{deck:IResDeck}

const store = useStore()
const props = defineProps<IProps>()
const emits = defineEmits(['lose','end'])
const id = store.state.userStore.id
const side = computed(()=>Number(props.deck.side))
const playerSide = computed(()=>props.deck.player_1_id==id?2:1)
const playzone = computed(()=>props.deck.playzone_deck)
const remainingDeck = computed(()=>props.deck.remaining_deck.length)

const unlink=(object:any)=>JSON.parse(JSON.stringify(object))

const flat= (array:any[][])=>{
    const flat =[]
    for(let i = 0;i< array.length;i++){
        for(let i2 = 0;i2<array[i].length;i2++){flat.push(array[i][i2])}}
    return flat
}

const end=()=>{
    const p1 = unlink(props.deck.player_1_deck);
    const p2 = unlink(props.deck.player_2_deck);
    const deck = unlink(props.deck.remaining_deck);
    //@ts-ignore
    if(playzone.value[playzone.value.length-1]?.length==2){
        if((p1.length<6||p2.length<6)&&deck.length>0){
        const calc1 = 6-p1.length
        const calc2 = 6-p2.length
        for(let i = 0;i<(calc1>0?calc1:0)+(calc2>0?calc2:0);i++){
            let recalc1 = 6-p1.length
            let recalc2 = 6-p2.length
            if(recalc1<recalc2) p2.push(...deck.splice(0,1))
            else if(recalc1>recalc2) p1.push(...deck.splice(0,1))
            else if(recalc1==recalc2) p1.push(...deck.splice(0,1))
            else p2.push(...deck.splice(0,1))
    }}}

    emits('end',{id:props.deck.id,p1,p2,deck,changeSide:side.value==1?2:1})
}

const lose=()=>{
    const p1 = unlink(props.deck.player_1_deck) ;
    const p2 = unlink(props.deck.player_2_deck);
    const deck = unlink(props.deck.remaining_deck);
    //@ts-ignore
    if(playzone.value[playzone.value.length-1]?.length!=2){
        //@ts-ignore
        if(side.value==1) p1.push(...flat(playzone.value))
        //@ts-ignore
        else p2.push(...flat(playzone.value))

        if(p1.length<6||p2.length<6){
        const calc1 = 6-p1.length
        const calc2 = 6-p2.length
        for(let i = 0;i<(calc1>0?calc1:0)+(calc2>0?calc2:0);i++){
            let recalc1 = 6-p1.length
            let recalc2 = 6-p2.length
            console.log(recalc1,recalc2)
            if(recalc1<recalc2) p2.push(...deck.splice(0,1))
            else if(recalc1>recalc2) p1.push(...deck.splice(0,1))
    }}}

    emits('end',{id:props.deck.id,p1,p2,deck,changeSide:side.value==1?2:1})
}
</script>

<template lang="pug">
.buttons-block(v-if="playerSide!=side&&playzone.length>0")
    .btn-end(@click='end' :class="{none:playzone[playzone.length-1]?.length!=2}") Бито
    .btn-lose(@click='lose' :class="{none:playzone[playzone.length-1]?.length==2}") Взять
</template>

<style lang="scss" scoped>

.none{
    pointer-events: none;
    opacity: .5;
}
.buttons-block{
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 30px;
    div{
        background-color: skyblue;
        border-radius: 10px;
        margin: 10px;
        padding: 5px 10px;
        cursor: pointer;
    }
}
</style>