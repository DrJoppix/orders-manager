<template>
    <div>
        <h1>Lista ordini</h1>

        <!-- Form filtri -->
        <form @submit.prevent="fetchOrders">
            <input v-model="filters.search" type="text" placeholder="Cerca..." />
            <input v-model="filters.name" type="text" placeholder="Cerca per nome esatto" />
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
        <ul>
            <li v-for="order in orders" :key="order.id">

                {{ order.name }} - {{ order.date }}

                <router-link :to="{ name: 'order-detail', params: { id: order.id } }">
                    Dettaglio
                </router-link>

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
    name: '',
    date: '',
    ordering: ''
})

onMounted(async () => {
    orders.value = await fetchOrders(filters)
})
</script>
