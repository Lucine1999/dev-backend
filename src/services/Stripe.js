import Stripe from "stripe";

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "shop",
    version: "0.0.1",
  },
});
