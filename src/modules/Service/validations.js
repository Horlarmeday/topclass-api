import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validateService(service) {
  const schema = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().required(),
    quantity: Joi.number().required(),
    selling_price: Joi.number().required(),
    unit: Joi.string().required(),
    comment: Joi.string()
      .optional()
      .allow(''),
  });
  return schema.validate(service);
}
