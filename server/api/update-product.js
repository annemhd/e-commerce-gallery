import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    try {
        const { active, productId } = body

        console.log(active)
        console.log(productId)

        await stripe.products.update(productId, {
            active: active,
        })
    } catch (error) {
        console.error(error)
        throw createError({ statusCode: 500, message: error.message })
    }
})
