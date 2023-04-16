import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/auth/Login.vue'
import ShowListDocumentVue from '@/components/document/ShowListDocument.vue'
import ConfigDocument from '@/components/document/ConfigDocument.vue'
import EditDocument from '@/components/document/EditDocument.vue'
import AddSubject from '@/components/document/AddSubject.vue'
import VueScheduler from '@/components/scheduler/VueScheduler.vue'
import EditScheduler from '@/components/scheduler/EditScheduler.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/document',
    name: 'showListDocument',
    component: ShowListDocumentVue
  },
  {
    path: '/document/config',
    name: 'addDocument',
    component: ConfigDocument
  },
  {
    path: '/document/editDocument/:id',
    name: 'editDocument',
    component: EditDocument
  },
  {
    path: '/document/config/addSubject',
    name: 'addSubject',
    component: AddSubject
  },
  {
    path: '/scheduler',
    name: 'MainScheduler',
    component: VueScheduler
  },
  {
    path: '/scheduler/editScheduler/:id',
    name: 'EditScheduler',
    component: EditScheduler
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
