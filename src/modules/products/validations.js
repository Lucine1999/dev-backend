import Joi from "joi";

export default {
  getProductByIdSchema: {
    params: Joi.object({
      productId: Joi.number().integer().required(),
    }),
  },

  createProductSchema: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      categoryId: Joi.number().positive().integer().required(),
      brandId: Joi.number().positive().integer().required(),
      description: Joi.string().required(),
      price: Joi.number().positive().integer().required(),
      discount: Joi.number().positive().allow(0).required(),
      productImg: Joi.string().uri().required(),
    }),
  },
  updateProductSchema: {
    params: Joi.object({
      productId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).required(),
      categoryId: Joi.number().positive().integer().required(),
      brandId: Joi.number().positive().integer().required(),
      description: Joi.string().required(),
      price: Joi.number().positive().integer().required(),
      discount: Joi.number().positive().allow(0).required(),
      productImg: Joi.string().uri().required(),
    }),
  },
};
