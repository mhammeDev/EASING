import { createRouter, createWebHistory } from 'vue-router'
//import {useUserStore} from "@/store/user";
//import {storeToRefs} from "pinia";

import MaintPage from '../views/MainPage.vue'
import UserView from "@/views/UserView.vue";


const routes = [

  {
//    path: '/',
  //  meta: {requiresAuth: false},
  //  component: () => import('../views/LoginView.vue')
  },
    {
  //  path: '/user',
      path: '/',
    component: UserView,
      //meta: {requiresAuth: true},
    children:[
      {
        path: '',
        name: 'MainPage',
        component: MaintPage
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const store = useUserStore();
  const { token, isLogged } = storeToRefs(store);
  const {verifyToken} = store

  if(token.value && !isLogged.value){
   await verifyToken()
  }


  if (requiresAuth) {
    if (token.value) {
      next();
    } else {
      next('/');
    }
  } else {
    if(token.value) {
      next('/user')
    }else
    next();
  }
});*/


export default router
