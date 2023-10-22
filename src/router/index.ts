import { createRouter, createWebHistory, type Router } from 'vue-router'

import ContactsList from '@/views/ContactsList.vue'
import ContactDetail from '@/views/ContactDetail.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: ContactsList,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ContactDetail,
    }
  ]
})

export default router
