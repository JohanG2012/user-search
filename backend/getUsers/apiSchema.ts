import * as Joi from 'joi';
import * as joiObjectId from 'joi-objectid';
const ObjectId = joiObjectId(Joi);

const querySchema = Joi.object()
  .keys({
    next: ObjectId().error(() => 'Not a valid cursor'),
    fields: Joi.string(),
    search: Joi.string(),
    limit: Joi.number().max(50),
  })
  .pattern(/./, Joi.string());

export const validateQuery = (query: object) => Joi.validate(query, querySchema);
