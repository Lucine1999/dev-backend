import Joi from "joi";

export default {
  createBrandSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(100).required(),
    }),
  },
  deleteBrandSchema: {
    params: Joi.object({
      brandId: Joi.number().integer().required(),
    }),
  },
  updateBrandSchema: {
    params: Joi.object({
      brandId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).max(100).required(),
    }),
  },
};
