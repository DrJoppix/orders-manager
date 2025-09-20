<template>
    <div>
        <h1>Modifica ordine {{ $route.params.id }}</h1>
    </div>

    <!-- Link per modificare l'ordine -->
    <router-link :to="{ name: 'order-detail', params: { id: $route.params.id } }">
        Dettaglio ordine {{ $route.params.id }}
    </router-link>

    <!-- Form modifica ordine -->
    <form @submit.prevent="updateOrder">
        <input v-model="order.name" type="text" placeholder="Nome" required />
        <input v-model="order.description" type="text" placeholder="Descrizione" />
        <input v-model="order.date" type="date" required />
        <button type="submit">Modifica</button>
    </form>

    <!-- Lista prodotti -->
    <div>
        <h3>Prodotti</h3>
        <div v-for="p in products" :key="p.id">
            <label>
                <input type="checkbox" :value="p.id" v-model="order.products" />
                {{ p.name }}, €{{ p.price }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// dichiarazione props esplicita per evitare errori in console.
defineProps(['id'])

const route = useRoute()
const order = reactive({
    name: '',
    description: '',
    date: '',
    products: []
})
const products = ref([])

async function fetchOrder() {
    let url = new URL(`http://127.0.0.1:8000/api/orders/${route.params.id}/`)

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Errore fetch ordine')
        }
        const data = await res.json()
        order.name = data.name
        order.description = data.description
        order.date = data.date
        order.products = data.products
    } catch (err) {
        console.error(err)
    }
}

async function fetchProducts() {
    try {
        let url = new URL('http://127.0.0.1:8000/api/products/');
        const res = await fetch(url)
        if (!res.ok) throw new Error('Errore fetch prodotti')
        products.value = await res.json()
    } catch (err) {
        console.error(err)
    }
}

async function updateOrder() {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/orders/${route.params.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        if (!res.ok) {
            throw new Error('Errore aggioramento ordine')
        }

        order.value = await res.json()
    } catch (err) {
        console.error(err)
    }
}

onMounted(fetchOrder)
onMounted(fetchProducts)

</script>