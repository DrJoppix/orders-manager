<template>
    <div class="order-edit">
        <div>
            <h1>Modifica ordine {{ $route.params.id }}</h1>
        </div>

        <!-- Link per modificare l'ordine -->
        <router-link class="order-link" :to="{ name: 'order-detail', params: { id: $route.params.id } }">
            Dettaglio ordine {{ $route.params.id }}
        </router-link>

        <!-- Form modifica ordine -->
        <form class="filters" @submit.prevent="applyFilters">
            <input v-model="order.name" type="text" placeholder="Nome" required />
            <input v-model="order.description" type="text" placeholder="Descrizione" />
            <input v-model="order.date" type="date" required />
            <button type="submit">Modifica</button>
        </form>

        <!-- Lista prodotti -->
        <div>
            <h3>Prodotti</h3>
            <div class="order-products" v-for="p in products" :key="p.id">
                <label>
                    <input type="checkbox" :value="p.id" v-model="order.products" />
                    {{ p.name }}, €{{ p.price }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchOrder, updateOrder } from '@/services/orders'
import { fetchProducts } from '@/services/products'

// dichiarazione props esplicita per evitare errori in console.
defineProps(['id'])

const route = useRoute()
const router = useRouter()
const order = reactive({
    name: '',
    description: '',
    date: '',
    products: []
})
const products = ref([])

// Funzione per applicare i filtri. Ho dovuto separarla da fetchOrders.
async function applyFilters(event) {
    event.preventDefault()
    order.value = await updateOrder(route.params.id, order)
    alert('Ordine aggiornato con successo!')
}

// Caricamento dettagli dell'ordine.
onMounted(() => {
    fetchOrder(route.params.id).then(data => {
        // Assegna i dati alla proprietà reattiva corrispondente.
        if (!data) {
            router.push({ name: 'orders-list' })
            return
        }
        Object.assign(order, data)
    })
})
onMounted(() => {
    fetchProducts().then(data => {
        Object.assign(products.value, data)
    })
})

</script>

<style scoped>
.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.filters input,
.filters button {
    padding: 5px 10px;
}

.order-link {
    display: inline-block;
    margin-bottom: 10px;
    text-decoration: none;
    color: blue;
}


.order-link:hover {
    text-decoration: underline;
}

.order-products {
    margin-top: 10px;
}
</style>