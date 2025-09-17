import { createRouter, createWebHistory } from 'vue-router'

import OrdersListView from '../views/OrdersListView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import OrderEditView from '../views/OrderEditView.vue'

const routes = [
  {
    path: '/orders',
    name: 'orders-list',
    component: OrdersListView,
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: OrderDetailView,
    props: true,
  },
  {
    path: '/orders/:id/edit',
    name: 'order-edit',
    component: OrderEditView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
