import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validateInvoice(invoice) {
  const schema = Joi.object({
    name: Joi.string().required(),
    cid: Joi.number().required(),
    invoice_type: Joi.string().required(),
    should_include_vat: Joi.boolean().required(),
    product: Joi.array()
      .items()
      .required(),
    // service: Joi.array().items(
    //   Joi.object({
    //     svid: Joi.number(),
    //     name: Joi.string(),
    //     quantity: Joi.number(),
    //     price: Joi.number(),
    //     total_price: Joi.number(),
    //   })
    // ),
  });
  return schema.validate(invoice);
}

export function validateWaybill(waybill) {
  const schema = Joi.object({
    driver_name: Joi.string().required(),
    name: Joi.string().required(),
    driver_phone: Joi.string().required(),
    cid: Joi.number().required(),
    vehicle_numb: Joi.string().required(),
    ivid: Joi.number().required(),
  });
  return schema.validate(waybill);
}
