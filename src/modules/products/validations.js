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
      categoryId: Joi.number().required().positive().integer(),
      brandId: Joi.number().positive().integer(),
      description: Joi.string().required("Please write a description."),
      price: Joi.number().positive().integer(),
      discount: Joi.number().required().integer(),
      productImg: Joi.string().uri().required(),
    }),
  },

  // createProductSchema: {
  //   body: Joi.object({
  //     name: Joi.string().required(),
  //     price: Joi.number().integer().required(),
  //   }),
  // },
};
