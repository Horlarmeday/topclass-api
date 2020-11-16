import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validateInvoice(invoice) {
  const schema = Joi.object({
    name: Joi.string().required(),
    cid: Joi.number().required(),
    invoice_type: Joi.string().required(),
    product: Joi.array().items(
      Joi.object({
        pid: Joi.number(),
        name: Joi.string(),
        quantity: Joi.number(),
        price: Joi.number(),
        total_price: Joi.number(),
      })
    ),
    service: Joi.array().items(
      Joi.object({
        svid: Joi.number(),
        name: Joi.string(),
        quantity: Joi.number(),
        price: Joi.number(),
        total_price: Joi.number(),
      })
    ),
  });
  return schema.validate(invoice);
}
