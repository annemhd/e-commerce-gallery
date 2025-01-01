<template>
    <div v-if="loading">Chargement...</div>
    <el-row v-if="productsList" :gutter="8">
        <el-col v-for="(product, index) in productsList" :key="index" :span="4">
            <NuxtLink :to="{ name: 'product-product', params: { product: product.product_id } }"
                ><el-image style="width: 100%; height: 100%" :src="product.images[0]" fit="cover"
            /></NuxtLink>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
const productsList: any = ref()
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
