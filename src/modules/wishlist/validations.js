import Joi from "joi";

export default {
  deleteWishlistByIdSchema: {
    params: Joi.object({
      wishlistId: Joi.number().integer().required(),
    }),
  },
};
