import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let userInfo = window.sessionStorage.account
        !userInfo ? next({name: 'login'}) : next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (window.sessionStorage.userInfo) {
//     console.log(1)
//     next()
//     // next({path: '/login'})
//     console.log(2)
//   } else {
//     console.log(3)
//     next()
//     console.log(4)
//   }
// })

export default router
