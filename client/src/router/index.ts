import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  //@ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      //@ts-ignore
      component: ()=>import('../views/Home.vue')
    }
  ]
})

export default router
