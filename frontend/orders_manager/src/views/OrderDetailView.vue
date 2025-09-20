<template>
    <div>
        <h1>Dettaglio ordine {{ $route.params.id }}</h1>
    </div>

    <!-- Link per modificare l'ordine -->
    <router-link :to="{ name: 'order-edit', params: { id: $route.params.id } }">
        Modifica ordine {{ $route.params.id }}
    </router-link>

    <!-- Dettagli ordine -->
    <div>
        <h3>Dettagli</h3>
        <p>Nome: {{ order.name }}</p>
        <p>Descrizione: {{ order.description }}</p>
        <p>Data: {{ order.date }}</p>
    </div>

    <button @click="deleteOrderHandler">Elimina ordine</button>

    <!-- Lista prodotti -->
    <h3>Prodotti</h3>
    <ul>
        <li v-for="p in order.products" :key="p.id">
            {{ p.name }} - €{{ p.price }}
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchOrderWithProducts, deleteOrder } from '@/services/orders'

// dichiarazione props esplicita per evitare errori in console.
defineProps(['id'])

const route = useRoute()
const router = useRouter()
const order = ref({})

onMounted(() => {
    fetchOrderWithProducts(route.params.id).then(data => {
        order.value = data
    })
})

const deleteOrderHandler = async () => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo ordine?')
    if (!confirmDelete) {
        return false
    }
    try {
        const res = await deleteOrder(route.params.id)
        if (!res) {
            throw new Error('Errore eliminazione ordine')
        }
        alert('Ordine eliminato con successo!')
        router.push({ name: 'orders-list' })
    } catch (error) {
        console.error('Errore eliminazione ordine:', error)
    }
}
</script>
