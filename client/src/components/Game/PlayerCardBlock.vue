<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
//@ts-ignore
import {useStore} from 'vuex'
import { type IResDeck ,type IDeck} from '@/tools/interfaces';
import C from '../../images/С.png'
import B from '../../images/B.png'
import T from '../../images/T.png'
import P from '../../images/P.png'
const images={C,B,T,P}
const values = {6:6,7:7,8:8,9:9,10:10,V:"В",D:'Д',K:'K',T:"T"}

interface IProps{deck:IResDeck}

const store = useStore()
const props = defineProps<IProps>()
const side = computed(()=>props.deck.side)
const id = store.state.userStore.id
const playerSide = computed(()=>props.deck.player_1_id==id?1:2)
const deck =computed<IDeck[]>(()=>playerSide.value==1?props.deck.player_1_deck:props.deck.player_2_deck)
const picked = ref(-1)

const pick=(card:IDeck,index:number)=>{
    picked.value=index
    if(playerSide.value==side.value)
        store.commit('setCard',{card,index,side:playerSide.value,changeSide:side.value==1?2:1})
}

watch(()=>store.state.gameStore.pickedCard,NV=>{if(NV==null)picked.value=-1})

</script>

<template lang="pug">
.player-deck(:class='{unclickable:playerSide!=side}')
    .single-card(v-for='(card,index) of deck' 
    :class="{'pickedCard':picked==index,'null':picked!=index}"
    @click='pick(card,index)')
        .card-side.upper-side()
            .card-value() {{values[card.value]}} 
            .card-sign()   
                img(:src='images[card.sign]')
        .card-side.bottom-side()
            .card-value() {{values[card.value]}}
            .card-sign()   
                img(:src='images[card.sign]')
</template>

<style lang="scss" scoped>
    .null{
        box-shadow: 0px 0px 10px rgb(185, 185, 185);
    }
    .pickedCard{
        box-shadow: 0px 0px 20px red;
    }
    .unclickable{
        pointer-events: none;
        opacity: .5;
    }
    .player-deck{
        justify-content: center;
        display: flex;
    }
    .single-card{
        transition: all .3s;
        display: flex;
        flex-direction: column;
        padding:0 10px;
        margin: 0 10px;
        border-radius: 1vw;
        font-size: 30px;
        height: 300px;
    }
    .card-value{
        margin-left: 17.5px;
    }
    .card-sign{
        width: 30%;
        img{
            width: 100%;
        }
    }
    .bottom-side{
        transform: rotate(180deg);
        margin-top: auto;
    }
</style>