import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeSecretKey)

    try {
        const productDetails = await stripe.products.retrieve(query.product_id)
        const priceList = await stripe.prices.retrieve(productDetails.default_price)

        const item = {
            product_id: productDetails.id,
            price_id: priceList.id,
            name: productDetails.name,
            description: productDetails.description,
            price: priceList.unit_amount,
            images: productDetails.images,
            created_at: productDetails.created,
            metadata: productDetails.metadata,
            active: productDetails.active,
        }

        return item
    } catch (error) {
        console.error('Error retrieving product or price data:', error)
    }
})
