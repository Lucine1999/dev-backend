import Joi from "joi";

export default {
  getUserByIdSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
  },
  createUserSchema: {
    body: Joi.object({
      firstName: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().min(3).max(100).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
  },
  loginUserSchema: {
    body: Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
  },
  deleteUserSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
  },
  updateUserRoleSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      role: Joi.string().min(3).max(100).required(),
    }),
  },
  updateUserDashboardSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      firstName: Joi.string().min(3).max(50),
      lastName: Joi.string().min(3).max(100),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ru"] },
      }),
      gender: Joi.string().min(3).max(100),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }),
  },
  updateUserPersonalInfoSchema: {
    body: Joi.object({
      firstName: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().min(3).max(100).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ru"] },
        })
        .required(),
    }),
  },
  updateUserPasswordSchema: {
    body: Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      newPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
  },
};
