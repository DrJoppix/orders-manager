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
import { useRoute } from 'vue-router'

// dichiarazione props esplicita per evitare errori in console.
defineProps(['id'])

const route = useRoute()
const order = ref({})

async function fetchOrder() {
    let url = new URL(`http://127.0.0.1:8000/api/orders/${route.params.id}/`)

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Errore fetch ordine')
        }
        const data = await res.json()

        // order.products contiene solo gli id, cicliamo e fetchiamo i dettagli
        if (Array.isArray(data.products)) {
            const productDetails = await Promise.all(
                data.products.map(async (id) => {
                    const pres = await fetch(`http://127.0.0.1:8000/api/products/${id}/`)
                    if (!pres.ok) {
                        throw new Error(`Errore fetch prodotto ${id}`)
                    }
                    return await pres.json()
                })
            )
            data.products = productDetails
        }

        order.value = data
    } catch (err) {
        console.error(err)
    }
}

onMounted(fetchOrder)
</script>
