<template>
  <div class="orders-list">
    <h1>Lista ordini</h1>

    <!-- Form filtri -->
    <form class="filters" @submit.prevent="applyFilters">
      <input v-model="filters.search" type="text" placeholder="Cerca..." />
      <input v-model="filters.date" type="date" />
      <select v-model="filters.ordering">
        <option value="">Senza ordine</option>
        <option value="name">Nome Ascendente</option>
        <option value="-name">Nome Discendente</option>
        <option value="date">Data Ascendente</option>
        <option value="-date">Data Discendente</option>
      </select>
      <button type="submit">Applica</button>
    </form>

    <!-- Lista ordini -->
    <ul class="order-items">
      <li v-for="order in orders" :key="order.id" class="order-item">
        <span class="order-info"
          >{{ order.name }} - {{ order.date }} - {{ order.description }}</span
        >
        <router-link :to="{ name: 'order-edit', params: { id: order.id } }" class="order-link"
          >Modifica</router-link
        >
        <router-link :to="{ name: 'order-detail', params: { id: order.id } }" class="order-link"
          >Dettaglio</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fetchOrders } from '@/services/orders'

const orders = ref([])

const filters = reactive({
  search: '',
  date: '',
  ordering: '',
})

// Funzione per applicare i filtri. Ho dovuto separarla da fetchOrders.
async function applyFilters(event) {
  event.preventDefault()
  orders.value = await fetchOrders(filters)
}

onMounted(async () => {
  orders.value = await fetchOrders(filters)
})
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filters input,
.filters select,
.filters button {
  padding: 5px 10px;
}

.order-items {
  list-style: none;
  padding: 0;
}

.order-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-bottom: 1px solid grey;
}

.order-info {
  flex: 1;
}

.order-link {
  text-decoration: none;
  color: blue;
}

.order-link:hover {
  text-decoration: underline;
}
</style>
