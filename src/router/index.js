import { createWebHistory , createRouter } from 'vue-router'

import HomeView from '../pages/HomeView.vue';
import DashboardView from '../pages/DashboardView.vue';
import WorkoutView from '../pages/WorkoutView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/dashboard', component: DashboardView },
  { path: '/workout', component: WorkoutView }

]

const router = createRouter({
  history: createWebHistory (),
  routes,
})
export default router;