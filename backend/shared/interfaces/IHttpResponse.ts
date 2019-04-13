import { HttpStatusCode } from '../enums/HttpStatusCode';

interface IHttpResponseHeaders {
  'Content-Type': string;
}

export interface IHttpResponse {
  status: HttpStatusCode;
  body?: string;
  headers?: IHttpResponseHeaders;
}
