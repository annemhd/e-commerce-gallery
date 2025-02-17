<template>
    <el-row :gutter="48" class="relative">
        <el-col :span="14"
            ><h1 class="text-3xl mb-6">Informations de paiement</h1>

            <div class="flex flex-col gap-4 p-6 rounded-md">
                <!-- element info client -->
                <div id="address-element" class="w-full"></div>
                <div id="payment-element" class="w-full"></div>
            </div>
        </el-col>
        <!-- <el-col :span="8">
                <div class="flex flex-col">
                   <h1>Condition de vhbehge</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium
                        interdum sodales. Cras eget arcu fermentum, tincidunt ex nec, commodo justo.
                        Etiam ultricies blandit mi non pharetra. Class aptent taciti sociosqu ad
                        litora torquent per conubia nostra, per inceptos himenaeos. Fusce sagittis,
                        lectus vitae congue luctus, nibh eros pulvinar leo, quis gravida mi nulla
                        finibus dolor. Pellentesque ut metus non tortor pretium mollis a feugiat
                        arcu. Pellentesque luctus quam vitae nulla dignissim sollicitudin.
                        Pellentesque finibus pharetra scelerisque. In eget justo velit. Pellentesque
                        sit amet lectus at eros luctus pharetra.
                    </p>
                </div>
            </el-col> -->

        <el-col :span="10" class="flex fixed right-0 w-full">
            <div class="flex flex-col w-full pr-16">
                <h1 class="text-3xl mb-6">Recapitulatif</h1>
                <h2 class="text-xl mb-2">{{ productData?.name }}</h2>
                <div class="flex justify-center rounded-xl mb-6 bg-stripe">
                    <el-image
                        style="width: 250px; height: 250px"
                        :src="productData?.images[0]"
                        fit="cover"
                    />
                </div>

                <div v-if="productData" class="flex flex-col gap-2 mb-6">
                    <div class="flex justify-between">
                        <span>Article</span>
                        <span>{{ convertToDecimal(productData?.price) }} €</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Livraison</span>
                        <span>{{ 10 }} €</span>
                    </div>

                    <div class="flex justify-between font-bold">
                        <span>Total</span>
                        <span
                            >{{
                                (parseFloat(convertToDecimal(productData?.price)) || 0) + 10
                            }}
                            €</span
                        >
                    </div>
                </div>
                <el-button type="primary" size="large" class="button" @click="confirmPayment()"
                    >Confirmer la commande</el-button
                >
            </div>
        </el-col>
    </el-row>
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
            body: JSON.stringify({ amount: productData.value?.price, currency: 'EUR' }),
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
                allowedCountries: ['FR', 'NL', 'HK', 'JP'],
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

watchEffect(() => {
    if (data.value) {
        productData.value = data.value
    }
})

const confirmPayment = async () => {
    const { error } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: { return_url: 'http://localhost:3000/confirm-payment' },
    })

    if (error) {
        console.error('Erreur lors du paiement:', error)
    }
}

watch(productData, (newX) => {
    console.log(`x is ${newX}`)
})
</script>

<style lang="scss" scoped>
.button {
    border-radius: 12px !important;
}

.bg-stripe {
    background-color: #f1f1f1;
}
</style>
