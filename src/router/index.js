import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateUser.vue')
  },
  {
    path: '/user/:id',
    name: 'edit',
    component: () => import('@/views/EditUser.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  //if (to.name) {
  // Start the route progress bar.
  NProgress.start()
  //}
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
export default router
