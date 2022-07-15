import Joi from "joi";

export default {
  createPaymentIntentSchema: {
    body: Joi.object({
      currency: Joi.string().required(),
      rate: Joi.number().required(),
    }),
  },
};
