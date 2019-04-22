import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import User from '../shared/models/User';
import { DATABASE_CONNECTION_ERROR, INTERNAL_ERROR, OK } from '../shared/utils/responseTemplates';
import { connect } from '../shared/models';
const DATABASE = process.env.MONGODB_URI;

/**
 *
 * @api {get} /api/v1/avatars Get
 * @apiVersion 1.0.0
 * @apiName getAvatars
 * @apiGroup Avatars
 *
 * @apiDescription Returns a list (array) of avatar images
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X GET http://localhost:3030/api/v1/avatars
 *
 * @apiSuccess (200) {Array} data Array of Avatars
 * @apiError (Error responses) {String} message Error message
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *  "data": [
 *    {
 *      "status":"success",
 *      "data": [
 *        "https://randomuser.me/api/portraits/thumb/men/36.jpg",
 *        "https://randomuser.me/api/portraits/thumb/men/11.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/5.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/15.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/42.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/25.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/29.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/63.jpg",
 *        "https://randomuser.me/api/portraits/thumb/women/32.jpg",
 *        "https://randomuser.me/api/portraits/thumb/men/12.jpg"
 *      ]
 *   }
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "status": "error"
 *    "message":"Could not connect to database",
 *    "errorCode": 2001
 * }
 */
const getAvatars: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  await connect(
    DATABASE,
    err => {
      context.res = DATABASE_CONNECTION_ERROR();
      context.log(`Database connection error: ${err}`);
      context.done();
    },
  );

  try {
    const thumbnails = await User.find()
      .select({ picture: 1 })
      .limit(10);
    context.res = OK(thumbnails);
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

export default getAvatars;
