import Joi from "joi";

export default {
  createCategorySchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(100).required(),
    }),
  },
  deleteCategorySchema: {
    params: Joi.object({
      categoryId: Joi.number().integer().required(),
    }),
  },
  updateCategorySchema: {
    params: Joi.object({
      categoryId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).max(100).required(),
    }),
  },
};
