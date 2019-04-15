import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { validateQuery } from './apiSchema';
import { connect } from '../shared/models';
import {
  VALIDATION_ERROR,
  INTERNAL_ERROR,
  OK,
  DATABASE_CONNECTION_ERROR,
} from '../shared/utils/responseTemplates';
import { getRequestedFields, stripObjProps } from '../shared/utils/helpers';
import User from '../shared/models/User';

const DEFAULT_LIMIT = 50;
const DATABASE = process.env.LOCAL_MONGODB_URI;

/**
 *
 * @api {get} /api/v1/users Get
 * @apiVersion 1.0.0
 * @apiName getUsers
 * @apiGroup Users
 *
 * @apiDescription Get Users
 * Default limit: 50,
 * Max limit: 50
 * Supports pagination with the use of a cursor (next) field
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X GET http://localhost:3030/api/v1/users
 *
 * @apiExample {curl} Example usage - Cusom limit:
 *     curl -v -X GET http://localhost:3030/api/v1/users?limit=2
 *
 * @apiExample {curl} Example usage - Search:
 *     curl -v -X GET http://localhost:3030/api/v1/users?search=justin
 *
 * @apiExample {curl} Example usage - Partial:
 *     curl -v -X GET http://localhost:3030/api/v1/todos?fields=firstname,lastname
 *
 * @apiExample {curl} Example usage - Filter:
 *     curl -v -X GET http://localhost:3030/api/v1/todos?name.title=mr
 *
 * @apiSuccess (200) {Array} data Array of User Objects
 * @apiSuccess (200) {String} next Cursor for next document in pagination
 * @apiError (Error responses) {String} message Error message
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *  "status": "success",
 *  "data": [
 *      {
 *          "name": {
 *              "title": "mr",
 *              "first": "jerry",
 *              "last": "sullivan"
 *          },
 *          "picture": {
 *              "large": "https://randomuser.me/api/portraits/men/55.jpg",
 *              "medium": "https://randomuser.me/api/portraits/med/men/55.jpg",
 *              "thumbnail": "https://randomuser.me/api/portraits/thumb/men/55.jpg"
 *          },
 *          "_id": "5cb22073ca3937d436f23447"
 *      }
 *  ],
 *  "next": "5cb22073ca3937d436f23447"
 * }
 *
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"Could not connect to database",
 * }
 */
const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const { query } = req;
  const { fields, limit, next, search: searchString } = query;
  const nonFilterQueries = ['fields', 'limit', 'next', 'search'];

  const { error: validationFailed } = validateQuery(query);

  if (validationFailed) {
    context.res = VALIDATION_ERROR(validationFailed);
    return context.done();
  }

  await connect(
    DATABASE,
    () => {
      context.res = DATABASE_CONNECTION_ERROR();
      context.done();
    },
  );

  const [filter] = stripObjProps([query], nonFilterQueries);

  const requestedFields = fields ? getRequestedFields(fields) : {};
  const nextFilter = next
    ? {
        _id: { $lt: next },
      }
    : {};

  const search: any = {};

  if (searchString) {
    search.$text = { $search: searchString };
  }

  const queryFilter = {
    ...nextFilter,
    ...filter,
    ...search,
  };

  const limitQuery = Number(limit) || DEFAULT_LIMIT;

  try {
    // Don't use skip, it has performence issues when skipping over large collections.
    const users = await User.find(queryFilter)
      .select(requestedFields)
      .sort({ _id: -1 })
      .limit(limitQuery);
    if (users.length === limitQuery) {
      context.res = OK(users, users[users.length - 1]._id);
    } else {
      context.res = OK(users);
    }
  } catch (e) {
    // Check for known errors above this line E.g duplication error.
    // Unknown error below
    context.res = INTERNAL_ERROR(e, context);
  }
  context.done();
};

export default httpTrigger;
