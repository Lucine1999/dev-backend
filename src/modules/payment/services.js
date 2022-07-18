import { stripe } from "../../services/Stripe.js";
import { getCartItemsDB } from "../cart/db.js";

export const getPublishableKey = (req, res, next) => {
  try {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    next(error);
  }
};

export const createPaymentIntent = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  const { currency, rate } = req.body;
  const { data, error } = await getCartItemsDB(userId);

  let amount = 0;
  if (!error) {
    data.forEach(({ product: { price, discount }, count }) => {
      amount += rate * (price - (price * discount) / 100) * count;
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.trunc(amount * 100),
      currency,
      payment_method_types: ["card"],
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};
