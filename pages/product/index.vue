<template>
    <div v-if="loading">Chargement...</div>
    <div v-if="productsList">
        <div class="flex gap-1 p-2 mb-6 justify-center">
            <el-button text :bg="filter === 'all'" @click="handleFilter('all')">Tout</el-button>
            <el-button text :bg="filter === 'abstract'" @click="handleFilter('abstract')"
                >Abstrait</el-button
            >
            <el-button text :bg="filter === 'realistic'" @click="handleFilter('realistic')"
                >Figuratif</el-button
            >
        </div>

        <el-row :gutter="8">
            <el-col v-for="(product, index) in filteredProducts" :key="index" :span="6">
                <NuxtLink
                    :to="{ name: 'product-product', params: { product: product.product_id } }"
                >
                    <el-image
                        style="width: 100%; height: 250px"
                        :src="product.images[0]"
                        fit="cover"
                        class="rounded-md"
                /></NuxtLink>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
const productsList: any = ref()
const loading = ref(true)
const filter = ref('all')

const filteredProducts = computed(() => {
    if (filter.value === 'all') {
        return productsList.value
    }
    return productsList.value.filter((product: any) => {
        const categoryKey = Object.keys(product.metadata).find((key) => key.trim() === 'category')
        return categoryKey ? product.metadata[categoryKey] === filter.value : false
    })
})

const { data, error } = await useFetch('/api/get-products', {
    method: 'GET',
})

if (error.value) {
    console.error('Error fetching products:', error.value)
} else {
    productsList.value = data?.value || []
    loading.value = false
}

const handleFilter = (filterValue: string) => {
    filter.value = filterValue
}
</script>
