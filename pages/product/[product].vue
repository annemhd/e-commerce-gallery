<template>
    <div class="flex justify-center items-center px-12">
        <div v-if="loading">Chargement...</div>
        <el-row :gutter="24">
            <el-col :span="16">
                <el-image
                    style="width: 100%"
                    :src="productData?.images[0]"
                    fit="cover"
                    class="rounded-md"
                />
            </el-col>
            <el-col :span="8">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex gap-2 h-full">
                        <el-tag type="primary">category</el-tag
                        ><el-tag type="primary">status</el-tag>
                    </div>
                    <NuxtLink
                        :to="{
                            name: 'payment-product',
                            params: { product: productData.product_id },
                        }"
                        ><el-button type="primary" size="large" class="flex w-full"
                            >Acheter</el-button
                        ></NuxtLink
                    >
                </div>

                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-4xl">{{ productData?.name }}</h1>
                    <h2 class="text-2xl">{{ convertToDecimal(productData?.price) }}€</h2>
                </div>

                <el-collapse v-model="activeNames">
                    <el-collapse-item title="Description" name="1">
                        <p class="mb-4">{{ productData?.description }}</p>
                    </el-collapse-item>
                    <el-collapse-item title="Frais de livraison" name="2">
                        <el-table class="mb-3" :data="tableData" style="width: 100%">
                            <el-table-column prop="size" label="Taille de la toile" width="180" />
                            <el-table-column prop="price" label="Prix" width="180" />
                        </el-table>
                    </el-collapse-item>
                    <!-- <el-collapse-item title="Condition de lorem ipsum" name="3">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium
                            interdum sodales. Cras eget arcu fermentum, tincidunt ex nec, commodo
                            justo. Etiam ultricies blandit mi non pharetra. Class aptent taciti
                            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            Fusce sagittis, lectus vitae congue luctus, nibh eros pulvinar leo, quis
                            gravida mi nulla finibus dolor. Pellentesque ut metus non tortor pretium
                            mollis a feugiat arcu. Pellentesque luctus quam vitae nulla dignissim
                            sollicitudin. Pellentesque finibus pharetra scelerisque. In eget justo
                            velit. Pellentesque sit amet lectus at eros luctus pharetra.
                        </p>
                    </el-collapse-item> -->
                </el-collapse>
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
const activeNames = ref(['1'])
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
