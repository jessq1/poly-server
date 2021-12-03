import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2020-08-27",
    appInfo: { 
      name: "stripe-samples/accept-a-payment",
      url: "https://github.com/stripe-samples",
      version: "0.0.2",
    },
    typescript: true,
  });

const paymentIntent = stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
  payment_method_types: ['card'],
  receipt_email: 'jenny.rosen@example.com',
});