import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as flatten from 'flat';
import User from '../shared/models/User';
import { connect } from '../shared/models';
import { validateBody, validateParams } from './apiSchema';
import {
  VALIDATION_ERROR,
  UPDATED,
  NOT_FOUND,
  INTERNAL_ERROR,
  DATABASE_CONNECTION_ERROR,
} from '../shared/utils/responseTemplates';
import { stripObjProps } from '../shared/utils/helpers';
const DATABASE = process.env.MONGODB_URI;

/**
 *
 * @api {patch} /api/v1/user/:id Update
 * @apiVersion 1.0.0
 * @apiName userTodo
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X PATCH -H "Content-Type: application/json" -d '{ "name": { "title": "mr"}}' http://localhost:3030/api/v1/user/5ca9fe78b9ec54647f5ef68f
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message Error message
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} url Documentation url to find more information
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 204
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"not a valid id",
 *    "errorCode":2000,
 *    "field":"id"
 * }
 */
const updateUser: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const { params, body = {} } = req;
  const { id } = params;

  const notAllowedUpdateFields = ['_id'];
  const [stripedBody] = stripObjProps([body], notAllowedUpdateFields);

  const { error: bodyValidationFailed } = validateBody(stripedBody);
  const { error: paramsValidationFailed } = validateParams(params);
  const validationFailed = bodyValidationFailed || paramsValidationFailed;

  if (validationFailed) {
    context.res = VALIDATION_ERROR(validationFailed);
    context.done();
    return;
  }

  await connect(
    DATABASE,
    err => {
      context.res = DATABASE_CONNECTION_ERROR();
      context.log(`Database connection error: ${err}`);
      context.done();
    },
  );

  try {
    const user = await User.findByIdAndUpdate(id, flatten(stripedBody));
    if (user) {
      context.res = UPDATED();
    } else {
      context.res = NOT_FOUND();
    }
  } catch (e) {
    // Check for known errors in case E.g duplication error, Topology was destroyed etc.
    // Unknown error is default
    switch (e.message.toLowerCase()) {
      case 'topology was destroyed':
        context.res = DATABASE_CONNECTION_ERROR();
        break;
      default:
        context.res = INTERNAL_ERROR(e, context);
    }
  }
  context.done();
};

export default updateUser;
