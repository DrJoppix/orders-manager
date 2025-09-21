<template>
    <div class="order-create">
        <h1>Crea nuovo ordine</h1>

        <!-- Form creazione ordine -->
        <form class="order-form" @submit.prevent="createOrderHandler">
            <input v-model="form.name" type="text" placeholder="Nome" required />
            <input v-model="form.description" type="text" placeholder="Descrizione" />
            <input v-model="form.date" type="date" required />
            <button type="submit">Crea</button>
        </form>

        <div>
            <h3>Prodotti</h3>

            <!-- Lista prodotti -->
            <div class="order-products" v-for="p in products" :key="p.id">
                <label>
                    <input type="checkbox" :value="p.id" v-model="form.products" />
                    {{ p.name }}, €{{ p.price }}
                </label>
            </div>
        </div>
        <p v-if="isCreated">
            <router-link :to="{
                name: 'order-detail',
                params: { id: order.id }
            }">
                Vai al dettaglio dell'ordine appena creato
            </router-link>
        </p>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { fetchProducts } from '@/services/products'
import { createOrder } from '@/services/orders'

const form = reactive({
    name: '',
    description: '',
    date: '',
    products: []
})

const isCreated = ref(false)
const products = ref([])
const order = reactive({})

// Crea l'ordine, e mostra il link al dettaglio.
async function createOrderHandler() {
    try {
        const res = await createOrder(form)
        if (!res.ok) {
            throw new Error('Errore creazione ordine')
        }
        const data = await res.json()
        Object.assign(order, data)
        isCreated.value = true
    } catch (err) {
        console.error(err)
    }
}

// Carica i prodotti.
onMounted(async () => {
    products.value = await fetchProducts()
})
</script>

<style scoped>
.order-form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.order-form input,
.order-form button {
    padding: 5px 10px;
}

.order-products {
    margin-top: 10px;
}
</style>