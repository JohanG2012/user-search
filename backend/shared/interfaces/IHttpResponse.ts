import { HttpStatusCode } from '../enums/HttpStatusCode';

interface IHttpResponseHeaders {
  'Content-Type': string;
}

interface IHttpResponseContent {
  status: HttpStatusCode;
  body: string;
  headers: IHttpResponseHeaders;
}
interface IHttpResponseNoContent {
  status: HttpStatusCode;
}

export type IHttpResponse = IHttpResponseNoContent | IHttpResponseContent;
