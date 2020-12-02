import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validatePayment(payment) {
  const schema = Joi.object({
    bank: Joi.string().required(),
    payment_method: Joi.string().required(),
    amount: Joi.number().required(),
    slid: Joi.number().required(),
    should_generate: Joi.boolean().required(),
  });
  return schema.validate(payment);
}
