import Vue from 'vue'
import Router from 'vue-router'
import rd from '@/views/rdDemo'
import demo from '@/views/table/demo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rd',
      component: rd
    },
    {
      path: '/',
      name: 'demo',
      component: demo
    }
  ]
})
