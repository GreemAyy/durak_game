<script lang="ts" setup>
import type { IResDeck } from '@/tools/interfaces';
//@ts-ignore
import {useStore} from 'vuex'

interface IProps{deck:IResDeck}

const store = useStore()
const props = defineProps<IProps>()
const emits =defineEmits(['lose','end'])
</script>

<template lang="pug">
.buttons-block()
    .btn-end() Бито
    .btn-lose() Взять
</template>

<style lang="scss">
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