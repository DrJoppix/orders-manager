<template>
    <div>
        <h1>Lista prodotti</h1>

        <!-- Form filtri -->
        <form @submit.prevent="applyFilters">
            <input v-model="filters.search" type="text" placeholder="Cerca..." />
            <select v-model="filters.ordering">
                <option value="">Senza ordine</option>
                <option value="name">Nome Ascendente</option>
                <option value="-name">Nome Discendente</option>
                <option value="price">Prezzo Ascendente</option>
                <option value="-price">Prezzo Discendente</option>
            </select> <button type="submit">Applica</button>
        </form>

        <!-- Lista ordini -->
        <ul>
            <li v-for="product in products" :key="product.id">

                {{ product.name }} - {{ product.price }}

            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fetchProducts } from '@/services/products'

const products = ref([])

const filters = reactive({
    search: '',
    ordering: '',
})

// Funzione per applicare i filtri. Ho dovuto separarla da fetchProducts.
async function applyFilters(event) {
    event.preventDefault()
    products.value = await fetchProducts(filters)
}

onMounted(async () => {
    products.value = await fetchProducts(filters)
})
</script>
