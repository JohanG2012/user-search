import { Context } from '@azure/functions';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IBody } from '../interfaces/IBody';
import { uniqueID } from './helpers';

export const DATABASE_CONNECTION_ERROR = (): IHttpResponse => {
  const body: IBody = {
    status: 'error',
    message: 'Unable to reach database',
    errorCode: 2001,
  };

  const response: IHttpResponse = {
    status: HttpStatusCode.ServiceUnavailable,
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const VALIDATION_ERROR = (JoiError: any) => {
  const {
    details: [
      {
        message: validationErr,
        path: [field],
      },
    ],
  } = JoiError;
  const body: IBody = {
    status: 'failed',
    field,
    message: validationErr,
    errorCode: 2002,
  };

  const response: IHttpResponse = {
    status: HttpStatusCode.BadRequest,
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const INTERNAL_ERROR = (e: { message: string }, context: Context): IHttpResponse => {
  const refId = uniqueID();
  context.log(`Error: ${e.message}, InvocationId: ${context.invocationId}, Ref: ${refId}`);
  const body: IBody = {
    status: 'error',
    message: `Oops! Something unknown happend. Please open an issues with intstructions on how to reproduce this response. Add this id to the issue: ${refId}`,
    errorCode: 2003,
  };
  const response: IHttpResponse = {
    status: HttpStatusCode.serverError,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const NOT_FOUND = (): IHttpResponse => {
  const body: IBody = {
    status: 'failed',
    message: 'Could not find requested resource.',
  };

  const response: IHttpResponse = {
    status: HttpStatusCode.NotFound,
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const CREATED = (): IHttpResponse => {
  const body: IBody = {
    status: 'success',
    message: 'Successfully created',
  };

  const response: IHttpResponse = {
    status: HttpStatusCode.Created,
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const OK = (data: any, next?: string): IHttpResponse => {
  const body: IBody = {
    status: 'success',
    data,
  };

  if (next) {
    body.next = next;
  }

  const response: IHttpResponse = {
    status: HttpStatusCode.Ok,
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(body),
  };
  return response;
};

export const DELETED = (): IHttpResponse => ({
  status: HttpStatusCode.NoContent,
});

export const UPDATED = (): IHttpResponse => ({
  status: HttpStatusCode.NoContent,
});
