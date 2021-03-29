import Joi from '@hapi/joi';

export function validateAsset(asset) {
  const schema = Joi.object({
    location: Joi.string().required(),
    cost: Joi.number().required(),
    name: Joi.string().required(),
    duration: Joi.string().required(),
    quantity: Joi.number().required(),
    date_purchased: Joi.date().required(),
    depreciation: Joi.number().required(),
  });
  return schema.validate(asset);
}

export function validateExpense(expense) {
  const schema = Joi.object({
    description: Joi.string().required(),
    cost: Joi.number().required(),
    name: Joi.string().required(),
    unit: Joi.string().required(),
    date_of_expense: Joi.date().required(),
  });
  return schema.validate(expense);
}