<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore()
</script>

<template lang="pug">
.header()
    .header-logo()
        span Карты
    .header-player(v-if='store.state.userStore.id!=="null"')
    
</template>

<style lang="scss">
    .header-logo{
        text-align:center;
        span{
            font-size:70px;
        }
    }
</style>