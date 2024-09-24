import { createRouter, createWebHistory } from 'vue-router';
import AddFriend from '../components/AddFriend.vue';
import AddReview from '../components/AddReview.vue';
import FriendList from '../components/FriendList.vue';
import MyHome from '../components/MyHome.vue';
import MyProfile from '../components/MyProfile.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/AddReview',
    name: 'AddReview',
    component: AddReview,
  },
  {
    path: '/AddFriend',
    name: 'AddFriend',
    component: AddFriend,
  },
  {
    path: '/FriendList',
    name: 'FriendList',
    component: FriendList,
  },
  {
    path: '/MyHome',
    name: 'MyHome',
    component: MyHome
  },
  {
    path: '/MyProfile',
    name: 'MyProfile',
    component: MyProfile,
  },
  // {
  //   path: '/ReviewInfoCard',
  //   name: 'ReviewInfoCard',
  //   component: Review_info_card,
  // },
  // {
  //   path: '/ReviewByGame',
  //   name: 'ReviewByGame',
  //   component: ReviewByGame,
  // },
  // {
  //   path: '/ReviewByUser',
  //   name: 'ReviewByUSer',
  //   component: ReviewByUser,
  // },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
  },
  // {
  //   path: 'UserProfile',
  //   name: 'UserProfile',
  //   component: UserProfile,
  // },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
