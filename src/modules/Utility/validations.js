import Joi from '@hapi/joi';

export function validateLabel(label) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(label);
}

export function validateUnit(unit) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(unit);
}

export function validateDefaultItem(item) {
  const schema = Joi.object({
    type: Joi.string().required(),
    item_id: Joi.number().required(),
    item: Joi.string().required(),
    label: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });
  return schema.validate(item);
}

export function validateSetting(setting) {
  const schema = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
  });
  return schema.validate(setting);
}

export function validateBank(bank) {
  const schema = Joi.object({
    account_name: Joi.string().required(),
    account_number: Joi.string().required(),
    bank_name: Joi.string().required(),
    sort_code: Joi.string().required(),
    tin_number: Joi.string().required(),
  });
  return schema.validate(bank);
}
