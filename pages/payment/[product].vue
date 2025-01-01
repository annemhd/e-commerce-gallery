<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="16">
                <h1>recap</h1>
                <el-image
                    style="width: 250px; height: 250px"
                    :src="productData?.images[0]"
                    fit="cover"
                />
                <div v-if="productData">
                    <p>{{ productData?.name }}</p>
                    <p>{{ convertToDecimal(productData?.price) }} €</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div id="address-element"></div>
                <div id="payment-element"></div>

                <el-button @click="confirmPayment()">confirm</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useStripe } from '@/composables/useStripe'
import { ref, onMounted } from 'vue'

const productData = ref<any>(null)
const stripe = ref()
const elements = ref()
const clientSecret = ref()
const loading = ref()
const route = useRoute()

onMounted(async () => {
    try {
        const { data } = await useFetch('/api/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({ amount: productData.value.price, currency: 'EUR' }),
        })

        clientSecret.value = data.value?.clientSecret

        stripe.value = await useStripe()

        if (stripe.value && clientSecret.value) {
            elements.value = stripe.value.elements({
                clientSecret: clientSecret.value,
                appearance: { theme: 'flat' },
            })

            const paymentElement = elements.value.create('payment')
            const addressElement = elements.value.create('address', {
                mode: 'shipping',
                allowedCountries: ['FR'],
            })

            paymentElement.mount('#payment-element')
            addressElement.mount('#address-element')
        }
    } catch (error) {
        console.error('Error fetching client secret or initializing Stripe:', error)
    } finally {
        loading.value = false
    }
})

const { data, error } = await useFetch(`/api/get-product?product_id=${route.params.product}`, {
    method: 'GET',
})

if (error.value) {
    console.error('Error fetching products:', error.value)
} else {
    productData.value = data.value
    loading.value = false
}

const confirmPayment = async () => {
    stripe.value
        .confirmPayment({
            elements: elements.value,
            confirmParams: {
                return_url: 'http://localhost:3000/confirm-payment',
            },
        })
        .then(function (result: any) {
            if (result.error) {
                // Inform the customer that there was an error.
            }
        })
}
</script>
