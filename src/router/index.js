import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/auth/Login.vue'
import ShowListDocumentVue from '@/components/document/ShowListDocument.vue'
import ConfigDocument from '@/components/document/ConfigDocument.vue'
import EditDocument from '@/components/document/EditDocument.vue'
import DashboardWorkSpace from '@/components/dashboard/DashboardWorkspace.vue'
import DocumentToDashboard from '@/components/dashboard/DocumentToDashboard.vue'

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
    name: 'showListDocument',
    component: ConfigDocument
  },
  {
    path: '/document/editDocument/:id',
    name: 'editDocument',
    component: EditDocument
  },
  {
    path: '/dashboard/',
    name: 'listDashboard',
    component: DocumentToDashboard
  },
  {
    path: '/dashboard/workspace/:id',
    name: 'dashboardWorkspace',
    component: DashboardWorkSpace
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
