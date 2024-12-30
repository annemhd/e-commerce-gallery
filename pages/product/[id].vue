<template>
    <div>
        <div v-if="productData">
            <p>Product Name: {{ productData.name }}</p>
            <p>Product Description: {{ productData.description }}</p>
            <p>Product Price: {{ productData.price }}</p>
            <img :src="productData.images[0]" />
            <NuxtLink :to="`/payment/${productData.price}`"> Payer </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()

const productData = ref<any>(null)

const { data, error } = await useFetch(`/api/get-product?product_id=${route.params.id}`, {
    method: 'GET',
})

if (error.value) {
    console.error('Error fetching products:', error.value)
} else {
    productData.value = data.value
}
</script>
