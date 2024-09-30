import { createRouter, createWebHistory } from 'vue-router';
import AddFriend from '../components/AddFriend.vue';
import AddReview from '../components/AddReview.vue';
import FriendList from '../components/FriendList.vue';
import MyHome from '../components/MyHome.vue';
import MyProfile from '../components/MyProfile.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import GameSearch from '@/components/GameSearch.vue';
import UserSearch from '@/components/UserSearch.vue';
import Review_info_card from '@/components/Review_info_card.vue';
import UserProfile from '@/components/UserProfile.vue';

const routes = [
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/AddReview',
    name: 'AddReview',
    component: AddReview,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/AddFriend',
    name: 'AddFriend',
    component: AddFriend,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/FriendList',
    name: 'FriendList',
    component: FriendList,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/Home',
    name: 'Home',
    component: MyHome,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/MyProfile',
    name: 'MyProfile',
    component: MyProfile,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/Review_info_card/:review_id',
    name: 'Review_info_card',
    component: Review_info_card,
    props: true,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/GameSearch',
    name: 'GameSearch',
    component: GameSearch,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/UserSearch',
    name: 'UserSearch',
    component: UserSearch,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/UserProfile/:user_Id',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }, // Protect this route
  },
  // Redirect all unmatched routes to SignIn
  {
    path: '/',
    redirect: '/SignIn',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Check token for authentication

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!isAuthenticated) {
      next('/SignIn'); // Redirect to SignIn if not authenticated
    } else {
      next(); // Allow access if authenticated
    }
  } else {
    next(); // Always allow access to public routes
  }
});

export default router;
