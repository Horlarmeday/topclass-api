import Joi from '@hapi/joi';

export function validateStaff(staff) {
  const schema = Joi.object({
    fullname: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    gender: Joi.string().required(),
    guarantor_name: Joi.string().required(),
    guarantor_phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    role: Joi.string().required(),
    username: Joi.string().required(),
  });
  return schema.validate(staff);
}

export function validateStaffLogin(user) {
  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    username: Joi.string().required(),
  });
  return schema.validate(user);
}

export function validateForgotPassword(user) {
  const schema = Joi.object({
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
  });
  return schema.validate(user);
}
