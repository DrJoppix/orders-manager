<template>
    <div>
        <h1>Crea nuovo ordine</h1>
        <form @submit.prevent="createOrder">
            <input v-model="form.name" type="text" placeholder="Nome" required />
            <input v-model="form.description" type="text" placeholder="Descrizione" />
            <input v-model="form.date" type="date" required />
            <button type="submit">Crea</button>
        </form>

        <div>
            <h3>Prodotti</h3>
            <div v-for="p in products" :key="p.id">
                <label>
                    <input type="checkbox" :value="p.id" v-model="form.products" />
                    {{ p.name }}, €{{ p.price }}
                </label>
            </div>
        </div>
        <p v-if="isCreated">
            <router-link :to="{
                name: 'order-detail',
                params: { id: order.value.id }
            }">
                Vai al dettaglio dell'ordine appena creato
            </router-link>
        </p>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const form = reactive({
    name: '',
    description: '',
    date: '',
    products: []
})

const isCreated = ref(false)
const products = ref([])
const order = reactive({})

async function fetchProducts() {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/products/')
        if (!res.ok) throw new Error('Errore fetch prodotti')
        products.value = await res.json()
    } catch (err) {
        console.error(err)
    }
}

async function createOrder() {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (!res.ok) {
            throw new Error('Errore creazione ordine')
        }

        isCreated.value = true

        order.value = await res.json()
    } catch (err) {
        console.error(err)
    }
}

onMounted(fetchProducts)
</script>
