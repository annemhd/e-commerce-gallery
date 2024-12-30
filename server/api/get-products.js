import Stripe from 'stripe'

export default defineEventHandler(async () => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    const stripe = new Stripe(stripeSecretKey) // Initialize the Stripe instance with the secret key

    try {
        const { data } = await stripe.products.list({
            limit: 100,
        })

        const productsList = await Promise.all(
            data.map(async (product) => {
                const { data } = await stripe.prices.list({
                    product: product.id,
                })
                const item = {
                    product_id: product.id,
                    price_id: data[0].id,
                    name: product.name,
                    description: product.description,
                    price: data[0].unit_amount,
                    images: product.images,
                    created_at: product.created,
                }
                return item
            })
        )

        return productsList
    } catch (error) {
        console.error(error)
    }
})
