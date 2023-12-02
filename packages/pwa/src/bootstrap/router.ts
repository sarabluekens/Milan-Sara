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
      path: '/caregiver',
      component: () => import('../components/wrappers/CaregiverWrap.vue'),
      meta: { shouldBeAuthenticated: true },
      children: [
        {
          path: 'dashboard',

          component: () => import('../views/firstAid/caregivers/dashboard.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/category',
      component: () =>
        import('../views/firstAid/visitors/emergencyCategory.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/firstAid/visitors/emergencyMap.vue'),
      props: true,
    },
    {
      path: '/Help',
      component: () => import('../views/firstAid/Help.vue'),
    },

    {
      path: '/admin',
      component: () => import('../views/administration/events/index.vue'),
      meta: { shouldBeAuthenticated: true, role: 'admin' }, // Rol afwerken
    },

    {
      path: '/admin/dashboard',
      component: () => import('../views/administration/Dashboard.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/admin/staff',
      component: () => import('../views/administration/StaffOverview.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/admin/equipment',
      component: () => import('../views/administration/EquipmentOverview.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/admin/event/detail/:id',
      component: () => import('../views/administration/events/EventDetail.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/event/add',
      component: () => import('../views/administration/events/AddEvent.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/account',
      component: () => import('../views/Account.vue'),
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
        {
          path: 'register',
          component: () => import('../views/auth/Register.vue'),
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
