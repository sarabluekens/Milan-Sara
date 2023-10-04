import { createRouter, createWebHistory } from 'vue-router'
import useFirebase from '@/composables/useFirebase'

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
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/account',
      component: () => import('../views/Account.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/caregiver',
      component: () => import('../views/Caregiver.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/add',
      component: () => import('../views/AddCaregiver.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/auth',
      component: () => import('../components/wrappers/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
          meta: { preventLoggedIn: true },
        },
      ],
    },

    {
      // 404 page
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    console.log('User is not authenticated')
    next({ path: '/auth/login' })
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    console.log('User is already logged in')
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
