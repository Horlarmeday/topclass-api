import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export function validateInvoice(invoice) {
  const schema = Joi.object({
    name: Joi.string().required(),
    cid: Joi.number().required(),
    invoice_type: Joi.string().required(),
    should_include_vat: Joi.boolean().required(),
    date_of_transaction: Joi.date().required(),
    product: Joi.array()
      .items()
      .required(),
    country_of_origin: Joi.string()
      .allow('')
      .optional(),
    condition_of_sale: Joi.string()
      .allow('')
      .optional(),
    terms_of_payment: Joi.string()
      .allow('')
      .optional(),
    delivery: Joi.string()
      .allow('')
      .optional(),
    validity: Joi.string()
      .allow('')
      .optional(),
    installation: Joi.string()
      .allow('')
      .optional(),
    place_of_delivery: Joi.string()
      .allow('')
      .optional(),
    bank_id: Joi.number()
      .allow('')
      .optional(),
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
