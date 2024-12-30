<template>
    <NuxtLink to="/payment">goooo payer</NuxtLink>

    <div v-if="loading">Chargement...</div>
    <div v-else>
        <div v-if="productsList.length === 0">No products found.</div>
        <div v-for="(product, index) in productsList" :key="index">
            <div>{{ product.name }}</div>
            <div>{{ convertToDecimal(product.price) }} €</div>
            <NuxtLink :to="`/product/${product.product_id}`"> voir le produit </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const productsList = ref<any[]>([])
const loading = ref(true)

const { data, error } = await useFetch('/api/get-products', {
    method: 'GET',
})

if (error.value) {
    console.error('Error fetching products:', error.value)
} else {
    productsList.value = data?.value || []
    loading.value = false
}
</script>
