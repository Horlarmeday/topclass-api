import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    state: Joi.string().required(),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    lga: Joi.string().required(),
    customer_type: Joi.string().required(),
  });
  return schema.validate(customer);
}
