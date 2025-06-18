import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductosView.vue'
import CarritoView from '../views/CarritoView.vue'
import { useAuthStore } from '../stores/AuthStore'
import RegisterView from '../views/RegisterView.vue'
import ComprasView from '../views/ComprasView.vue'
import MercadoPagoView from '../views/MercadoPagoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {requiresGuest: true},
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    },
    {
      path: '/compras',
      name: 'compras',
      component: ComprasView,
      meta: {requiresAuth: true},
    },
    {
      path: '/pagar',
      name: 'pagar',
      component: MercadoPagoView,
      meta: {requiresAuth: true}
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  }else if(to.meta.requiresGuest && authStore.isAuthenticated){
    next('/');
  } else {
    next();
  }
});

export default router
