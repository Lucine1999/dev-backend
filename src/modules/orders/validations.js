import Joi from "joi";

export default {
  createOrderSchema: {
    body: {
      productIds: Joi.array(),
      amount: Joi.number(),
    },
  },
  deleteOrderByIdSchema: {
    params: Joi.object({
      orderId: Joi.number().integer().required(),
    }),
  },
};
