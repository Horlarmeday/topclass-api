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
