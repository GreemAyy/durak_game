<script lang="ts" setup>
const props = defineProps(['item'])
</script>

<template lang="pug">
.game-item()
    .game-number() Игра №{{item.id}}
    .connect-btn() Присоедениться
</template>

<style lang="scss">
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