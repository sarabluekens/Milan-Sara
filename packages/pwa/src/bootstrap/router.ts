import { createRouter, createWebHistory } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import { useQuery } from '@vue/apollo-composable'
import { GET_USER_BY_UID } from '@/graphql/user.query'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/caregiver',
      component: () => import('../components/wrappers/CaregiverWrap.vue'),
      meta: { shouldBeAuthenticated: true, role: 'CAREGIVER' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/firstAid/caregivers/Dashboard.vue'),
          props: true,
        },
        {
          path: '/caregiver/map/:caseId',
          name: 'caregiversMap',
          component: () => import('../views/firstAid/caregivers/CaseMap.vue'),
          props: true,
        },
        {
          path: '/caregiver/map/afterAction/:caseId',
          name: 'afterAction',
          component: () =>
            import('../views/firstAid/caregivers/AfterAction.vue'),
        },
      ],
    },
    {
      path: '/category',
      component: () =>
        import('../views/firstAid/visitors/EmergencyCategory.vue'),
    },
    {
      path: '/map/:caseId',
      name: 'map',
      component: () => import('../views/firstAid/visitors/EmergencyMap.vue'),
      props: true,
    },
    {
      path: '/map/flicker',
      name: 'flicker',
      component: () => import('../views/firstAid/visitors/FlickerScreen.vue'),
      props: true,
    },
    // {
    //   path: '/Help',
    //   component: () => import('../views/firstAid/Help.vue'),
    // },

    {
      path: '/admin',
      component: () => import('../components/wrappers/AdminWrap.vue'),
      meta: { shouldBeAuthenticated: true, role: 'ADMIN' }, // Only persons with role admin can access this route
      children: [
        {
          path: 'dashboard',
          component: () =>
            import('../views/administration/redCross/Dashboard.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'event',
          component: () =>
            import('../views/administration/events/EventsOverview.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'staff',
          component: () =>
            import('../views/administration/redCross/StaffOverview.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'equipment',
          component: () =>
            import('../views/administration/redCross/EquipmentOverview.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'case',
          component: () =>
            import('../views/administration/redCross/CaseOverview.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'event/detail/:id',
          component: () =>
            import('../views/administration/events/EventDetail.vue'),
          meta: { shouldBeAuthenticated: true },
        },
      ],
    },

    {
      path: '/company',
      component: () => import('../components/wrappers/CompanyWrap.vue'),
      meta: { shouldBeAuthenticated: true, role: 'COMPANY' }, // Only persons with role company can access this route
      children: [
        {
          path: 'dashboard',
          component: () =>
            import('../views/administration/exteriorCompany/Dashboard.vue'),
          meta: { shouldBeAuthenticated: true },
        },
        {
          path: 'event/add',
          component: () =>
            import('../views/administration/events/AddEvent.vue'),
          meta: { shouldBeAuthenticated: true },
        },
      ],
    },

    {
      path: '/account',
      component: () => import('../views/Account.vue'),
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

  const { result: user } = useQuery(GET_USER_BY_UID, {
    uid: firebaseUser.value?.uid,
  })

  console.log(firebaseUser.value)

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    console.log('User is not authenticated')
    next({ path: '/auth/login' })
  }
  if (to.meta.role && firebaseUser.value) {
    if (to.meta.role === user.value.userByUid.role) {
      return next()
    } else {
      console.log('User does not have the right role')
      next({ path: '/' })
    }
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    console.log('User is already logged in')
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
