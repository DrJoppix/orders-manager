<template>
    <div class="order-detail">
        <div>
            <h1>Dettaglio ordine {{ $route.params.id }}</h1>
        </div>

        <!-- Link per modificare l'ordine -->
        <router-link class="order-link" :to="{ name: 'order-edit', params: { id: $route.params.id } }">
            Modifica ordine {{ $route.params.id }}
        </router-link>

        <!-- Dettagli ordine -->
        <div class="order-details">
            <h3>Dettagli</h3>
            <p>Nome: {{ order.name }}</p>
            <p>Descrizione: {{ order.description }}</p>
            <p>Data: {{ order.date }}</p>
        </div>

        <button class="order-delete-btn" @click="deleteOrderHandler">Elimina ordine</button>

        <!-- Lista prodotti -->
        <h3>Prodotti</h3>
        <ul class="order-products">
            <li v-for="p in order.products" :key="p.id">
                {{ p.name }} - €{{ p.price }}
            </li>
        </ul>
    </div>
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
        if (!data) {
            router.push({ name: 'orders-list' })
            return
        }
        Object.assign(order.value, data)
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

<style scoped>
.order-link {
    text-decoration: none;
    color: blue;
}

.order-link:hover {
    text-decoration: underline;
}

.order-products {
    list-style: none;
    padding: 0;
}

.order-products li {
    margin-bottom: 5px;
}

.order-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.order-delete-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    margin-bottom: 20px;
}
</style>