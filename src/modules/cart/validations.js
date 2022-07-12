import Joi from "joi";

export default {
  deleteCartByIdSchema: {
    params: Joi.object({
      cartId: Joi.number().integer().required(),
    }),
  },
};
