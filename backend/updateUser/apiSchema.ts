import * as Joi from 'joi';
import * as joiObjectId from 'joi-objectid';
const ObjectId = joiObjectId(Joi);

const bodySchema = Joi.object()
  .keys({
    picture: Joi.object().keys({
      large: Joi.string(),
      medium: Joi.string(),
      thumbnail: Joi.string(),
    }),
    name: Joi.object().keys({
      title: Joi.string(),
      first: Joi.string(),
      last: Joi.string(),
    }),
    permission: Joi.boolean(),
  })
  .or(
    'permission',
    'picture.large',
    'picture.medium',
    'picture.thumbnail',
    'name.title',
    'name.first',
    'name.last',
  );

const paramsSchema = Joi.object().keys({
  id: ObjectId()
    .required()
    .error(() => 'Not a valid id'),
});

export const validateBody = (body: object) => Joi.validate(body, bodySchema);

export const validateParams = (params: object) => Joi.validate(params, paramsSchema);
