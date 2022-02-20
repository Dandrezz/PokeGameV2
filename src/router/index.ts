import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PokemonPage from '../pages/PokemonPage.vue'
import ScorePage from '../pages/ScorePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Game',
    component: PokemonPage
  },
  {
    path: '/score',
    name: 'Score',
    component: ScorePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router