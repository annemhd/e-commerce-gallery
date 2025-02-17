<template>
    <div class="h-full">
        <div v-if="loading">Chargement...</div>
        <el-row :gutter="24" class="h-full">
            <el-col :span="16" class="h-full">
                <div
                    class="bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center w-full h-full"
                >
                    <el-image
                        :src="productData?.images[0]"
                        :preview-src-list="productData?.images"
                        fit="contain"
                        style="height: 100%"
                    />
                </div>
            </el-col>
            <el-col :span="8">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex gap-2 h-full">
                        <el-tag type="primary" size="large" class="tag">{{ category }}</el-tag
                        ><el-tag :type="handleStatusStyle" size="large" class="tag">{{
                            status
                        }}</el-tag>
                    </div>
                    <NuxtLink
                        :to="{
                            name: 'payment-product',
                            params: { product: productData.product_id },
                        }"
                        ><el-button type="primary" size="large" class="button flex w-full"
                            >Acheter</el-button
                        ></NuxtLink
                    >
                </div>

                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-4xl">{{ productData?.name }}</h1>
                    <h2 class="text-2xl">{{ convertToDecimal(productData?.price) }}€</h2>
                </div>

                <el-collapse>
                    <el-collapse-item title="Description" name="1">
                        <p class="mb-4">{{ productData?.description }}</p>
                    </el-collapse-item>
                    <el-collapse-item title="Frais de livraison" name="2">
                        <el-table class="mb-3" :data="tableData" style="width: 100%">
                            <el-table-column prop="size" label="Taille de la toile" width="180" />
                            <el-table-column prop="price" label="Prix" width="180" />
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(true)

const productData = ref<any>(null)

const category = computed(() => {
    if (!productData.value?.metadata) return null

    const categoryKey = Object.keys(productData.value.metadata).find(
        (key) => key.trim() === 'category'
    )

    const result = categoryKey ? productData.value.metadata[categoryKey] : null

    return result === 'abstract' ? 'Abstrait' : 'Figuratif'
})

const status = computed(() => {
    return productData.value.active ? 'Disponible' : 'Vendue'
})

const handleStatusStyle = computed(() => {
    return productData.value.active ? 'primary' : 'warning'
})

const test = computed(() => {
    return route.params.product
})

const tableData = [
    {
        size: 'Petit xL à xL ',
        price: 10,
    },
    {
        size: 'Petit xL à xL ',
        price: 20,
    },
    {
        size: 'Petit xL à xL ',
        price: 30,
    },
    {
        size: 'Petit xL à xL ',
        price: 40,
    },
]

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

<style lang="scss" scoped>
.button {
    border-radius: 12px !important;
}

.tag {
    border-radius: 12px !important;
}
</style>
