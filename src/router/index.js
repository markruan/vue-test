import Vue from 'vue'
import Router from 'vue-router'
import Mv from "../pages/Mv"
import HelloWorld from '../components/HelloWorld.vue'
import GeDanList from '../pages/GeDanList.vue'
import Player from '../pages/player'


Vue.use(Router)

export default new Router({


  routes: [
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv
    },
    {
      path: '/',
      name: 'index',
      component: HelloWorld
    },
    {
      path: '/list/:id',
      name: 'list',
      component: GeDanList
    },
    {
      path: '/player/:id',
      name: 'player',
      component: Player
    }

  ]
})


