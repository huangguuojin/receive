import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Area from '@/views/area/Area'
import Account from '@/views/account/Account'
import RepairFactory from '@/views/repairfactory/RepairFactory'
import RepairFactoryRelation from '@/views/repairfactory/RepairFactoryRelation'
import Parts from '@/views/parts/Parts'
import Draft from '@/views/order/draft/Draft'
import Release from '@/views/order/Release'
import Distribute from '@/views/order/distribute/Distribute'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/area/list',
          name: 'Area',
          component: Area
        },
          {
              path: '/account/list',
              name: 'Account',
              component: Account
          },
          {
              path: '/repair_factory/listall',
              name: 'RepairFactory',
              component: RepairFactory
          },
          {
              path: '/repair_factory/listrelationall',
              name: 'RepairFactoryRelation',
              component: RepairFactoryRelation
          },
          {
              path: '/parts/index',
              name: 'Parts',
              component: Parts
          },
          {
              path: '/order/draft',
              name: 'Draft',
              component: Draft
          },
          {
              path: '/order/release',
              name: 'Release',
              component: Release
          },
          {
              path: '/order/distribute',
              name: 'Distribute',
              component: Distribute
          },
        ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let Authorization = localStorage.getItem('Authorization')
    if (Authorization === null || Authorization === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
