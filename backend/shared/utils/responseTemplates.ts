import { Context } from '@azure/functions';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IBody } from '../interfaces/IBody';

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

export const VALIDATION_ERROR = () => {
  // TODO: Implement, use code 2002
};

export const INTERNAL_ERROR = (e: { message: string }, context: Context): IHttpResponse => {
  context.log(e.message); // Could be set to print to log files instead
  const body: IBody = {
    status: 'error',
    message:
      'Oops! Something unknown happend. Please open an issues with intstructions on how to reproduce this response.',
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
