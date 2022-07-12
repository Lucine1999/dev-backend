import Joi from "joi";

export default {
  createContactSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } })
        .required(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
    }),
  },
  deleteContactSchema: {
    params: Joi.object({
      contactId: Joi.number().integer().required(),
    }),
  },
};
