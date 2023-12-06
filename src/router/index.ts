import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: {
      layout: 'default-layout',
    },
  },
  {
    path: '/webcam',
    name: 'webcam',
    component: () =>
      import(/* webpackChunkName: "webcam" */ '../views/WebcamView.vue'),
    meta: {
      layout: 'default-layout',
    },
  },
  {
    path: '/geometry',
    name: 'geometry',
    component: () =>
      import(/* webpackChunkName: "geometry" */ '../views/Geometry.vue'),
    meta: {
      layout: 'default-layout',
    },
  },
  //   {
  //     path: '/reset-password',
  //     name: 'reset-password',
  //     component: () =>
  //       import(
  //         /* webpackChunkName: "reset-password" */ '../views/auth/ResetPassword.vue'
  //       ),
  //     meta: {
  //       layout: 'auth-layout',
  //     },
  //   },
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: () =>
  //       import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  //     meta: {
  //       layout: 'default-layout',
  //     },
  //     children: [
  //       {
  //         path: '/list',
  //         name: 'entry-list',
  //         component: () =>
  //           import(
  //             /* webpackChunkName: "entry-list" */ '../components/entry/EntryList.vue'
  //           ),
  //         meta: {
  //           layout: 'default-layout',
  //         },
  //       },
  //       {
  //         path: '/entry-detail',
  //         name: 'entry-detail',
  //         component: () =>
  //           import(
  //             /* webpackChunkName: "entry-detail" */ '../components/entry/EntryDetail.vue'
  //           ),
  //         meta: {
  //           layout: 'default-layout',
  //         },
  //       },
  //     ],
  //   },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// router.beforeEach((to, _, next) => {
//   if (to.path === "/") {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
