<script setup lang="ts">
import { useStore } from 'vuex';
import {queryCreateUser} from '../../querys/User.query.ts'
const store = useStore()
const sign=async()=>{
    const req = await queryCreateUser('','','guest')
    if(req.status==200)
        store.commit('setId',req.userID)
}
</script>

<template lang="pug">
.header()
    .header-logo()
        span Дурак
    .header-player(v-if='store.state.userStore.id!=null') Гость №{{store.state.userStore.id}}
    .btn-sign(v-else @click='sign' ) Войти как гость 
</template>

<style lang="scss">
    .header-logo{
        text-align:center;
        span{
            font-size:70px;
        }
    }
    .header-player{
        font-size:30px;
        text-align:center;
    }
    .btn-sign{
        text-align:center;
        font-size:30px;
        cursor:pointer;
        &:hover{
            text-decoration: underline;
        }
    }
</style>