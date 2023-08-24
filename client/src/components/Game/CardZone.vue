<script lang="ts" setup>
import {useStore} from 'vuex'
import { type IResDeck ,type IDeck} from '@/tools/interfaces';
import { computed } from 'vue';
interface IProps{deck:IResDeck}

const store = useStore()
const props = defineProps<IProps>()
const playzone = computed(()=>props.deck.playzone_deck)
const remainingDeck = computed(()=>props.deck.remaining_deck.length)
</script>

<template lang="pug">
.middle-game-zone()
    .remaining-deck()
    .play-zone()    
</template>

<style lang="scss">

</style>