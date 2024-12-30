<template>
    <div>
        <div id="address-element"></div>
        <div id="payment-element"></div>
        <button @click="confirmPayment()">confirm</button>
    </div>
</template>

<script setup lang="ts">
import { useStripe } from '@/composables/useStripe'
import { ref, onMounted } from 'vue'

const stripe = ref()
const elements = ref()
const clientSecret = ref()
const loading = ref()
const route = useRoute()

onMounted(async () => {
    try {
        const { data } = await useFetch('/api/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({ amount: route.params.price, currency: 'EUR' }),
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
