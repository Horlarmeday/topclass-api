import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validatePayment(payment) {
  const schema = Joi.object({
    payment_method: Joi.string().required(),
    bank: Joi.number().required(),
    amount: Joi.number().required(),
    slid: Joi.number().required(),
    should_generate: Joi.boolean().required(),
    date_of_payment: Joi.date().required(),
  });
  return schema.validate(payment);
}
