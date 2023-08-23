<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const props = defineProps(['item','have'])
const store = useStore()
const id = store.state.userStore.id
const connect=()=>{
    window.location.pathname='/game/'+props.item.id
}
</script>

<template lang="pug">
.game-item()
    .game-number() Игра №{{item.id}}
    .log-in-game(
        v-if="(item.player_1_id==id||item.player_2_id==id)"
        @click='connect') Войти
    .just-game-btn(v-else-if='have') Вы уже в игре
    .connect-btn(v-else  @click='connect') Присоедениться
</template>

<style lang="scss">
.log-in-game{
    background-color: red;
    color: white;
    padding: 0 5px;
    cursor: pointer;
}
.game-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 2px solid black;
    margin: 10px 0;
}

.connect-btn{
    background-color: black;
    color: white;
    cursor: pointer;
    padding: 0 5px;
}
</style>