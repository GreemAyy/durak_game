<script lang="ts" setup>
//@ts-ignore
import {useStore} from 'vuex'
import { type IResDeck ,type IDeck} from '@/tools/interfaces';
import { computed } from 'vue';
import C from '../../images/С.png'
import B from '../../images/B.png'
import T from '../../images/T.png'
import P from '../../images/P.png'
const images={C,B,T,P}
const values = {6:6,7:7,8:8,9:9,10:10,V:"В",D:'Д',K:'K',T:"T"}

interface IProps{deck:IResDeck}

const emits = defineEmits(['move'])
const store = useStore()
const props = defineProps<IProps>()
const playzone = computed(()=>props.deck.playzone_deck)
const remainingDeck = computed(()=>props.deck.remaining_deck.length)

const move=()=>{
    const card = store.state.gameStore.pickedCard
    if(card!==null)
        emits('move')
}

</script>

<template lang="pug">
.middle-game-zone()
    .remaining-deck()
        .remaining-card {{remainingDeck}}
    .play-zone()
        .zone(v-for='(card,index) of (playzone[playzone.length-1]?.length==1?playzone.slice(0,playzone.length-1):playzone)')
            .zone-card() 
                .zone-card-child.under-card()
                    .zone-card-in.upper-block
                        .card-value() {{values[card[0].value]}}
                        .card-sign()   
                            img(:src='images[card[0].sign]')
                    .zone-card-in.bottom-block
                        .card-value() {{values[card[0].value]}}
                        .card-sign()   
                            img(:src='images[card[0].sign]')
                .zone-card-child.upper-card()
                    .zone-card-in.upper-block
                        .card-value() {{values[card[1].value]}}
                        .card-sign()   
                            img(:src='images[card[1].sign]')
                    .zone-card-in.bottom-block
                        .card-value() {{values[card[1].value]}}
                        .card-sign()   
                            img(:src='images[card[1].sign]')            
        .zone-card(v-if='playzone[playzone.length-1]?.length==1' @click='move')
            .zone-card() 
                .zone-card-child.under-card()
                    .zone-card-in.upper-block
                        .card-value() {{values[playzone[playzone.length-1][0].value]}}
                        .card-sign()   
                            img(:src='images[playzone[playzone.length-1][0].sign]')
                    .zone-card-in.bottom-block
                        .card-value() {{values[playzone[playzone.length-1][0].value]}}
                        .card-sign()   
                            img(:src='images[playzone[playzone.length-1][0].sign]')
        .zone-card.to-pick(v-else @click='move') 
</template>

<style lang="scss" scoped>
.under-card{
    width: 100%;
    position: absolute;
}
.upper-card{
    position: absolute;
    top: 40px;
    left: 30px;
    background-color: white;
    z-index: 3;
}
.bottom-block{
        transform: rotate(180deg);
        margin-top: auto;
    }
.card-value{
    font-size: 2vw;
    margin-left: 10px;
}
.card-sign{
    width: 50%;
    img{
        width: 100%;
    }
}
.play-zone{
    display: flex;
    align-items: center;
}
.middle-game-zone{
    display: flex;
}
.zone-card{
    position: relative;
    display: flex;
    width: 175px;
    height: 250px;
    margin: 0 20px;
    // border: 1px solid black;
    border-radius: 1vw;
}
.to-pick{
    border: 1px solid black;
}

.zone-card-child{
    display: flex;
    width: 175px;
    height: 250px;
    border: 1px solid black;
    border-radius: 1vw;
}



.remaining-deck{
    position: relative;
    width: 200px ;
    height: 300px;
    background-color: skyblue;
    border-radius: 1vw;
}
.remaining-card{
    position: absolute;
    font-size: 2vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    padding:0px 10px 10px;
    border-radius: 50%;
}

</style>