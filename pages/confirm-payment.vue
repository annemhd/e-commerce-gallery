<template>Thanksssss</template>
<script setup lang="ts">
const updateProductStatus = async () => {
    try {
        const response = await useFetch('/api/update-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: '', active: false }),
        })

        if (response.error.value) {
            throw new Error(response.error.value.message)
        }

        console.log('Success:', response.data.value)
    } catch (error) {
        console.error('Failed to update product status:', error)
    }
}
</script>
