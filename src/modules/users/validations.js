import Joi from 'joi'

export default {
  getUserByIdSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
  },
  createUserSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().min(3).max(100).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
        .required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),
  },
}
