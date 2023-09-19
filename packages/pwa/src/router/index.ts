import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },

    {
      path: '/Help',
      component: () => import('../views/firstAid/Help.vue'),
    },

    {
      path: '/administration',
      component: () => import('../views/administration/events/index.vue'),
    },

    {
      // 404 page
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
