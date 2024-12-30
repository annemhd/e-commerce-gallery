import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    try {
        const { amount, currency } = body

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        })

        return { clientSecret: paymentIntent.client_secret }
    } catch (error) {
        console.error(error)
        throw createError({ statusCode: 500, message: error.message })
    }
})
