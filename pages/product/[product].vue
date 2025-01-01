<template>
    <div>
        <div v-if="loading">Chargement...</div>
        <el-row :gutter="12">
            <el-col :span="16">
                <el-image
                    style="width: 100%; height: 100%"
                    :src="productData?.images[0]"
                    fit="cover"
                />
            </el-col>
            <el-col :span="8">
                <div v-if="productData">
                    <p>{{ productData?.name }}</p>
                    <p>{{ productData?.description }}</p>
                    <p>{{ convertToDecimal(productData?.price) }} €</p>

                    <NuxtLink
                        :to="{
                            name: 'payment-product',
                            params: { product: productData.product_id },
                        }"
                        ><el-button type="primary">Acheter</el-button></NuxtLink
                    >
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(true)

const productData = ref<any>(null)

const test = computed(() => {
    return route.params.product
})

const { data, error } = await useFetch(`/api/get-product?product_id=${test.value}`, {
    method: 'GET',
})

if (error.value) {
    console.error('Error fetching products:', error.value)
} else {
    productData.value = data.value
    loading.value = false
}
</script>
