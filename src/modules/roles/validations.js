import Joi from 'joi'

export default {
  getRoleByIdSchema: {
    params: Joi.object({
      RoleId: Joi.number().integer().required(),
    }),
  },
}
