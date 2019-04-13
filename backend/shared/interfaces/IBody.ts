interface ISuccessBody {
  status: string;
  data?: any;
  message?: string;
  next?: string;
}

interface IErrorBody {
  status: string;
  field?: string;
  errorCode: number;
  message: string;
}

export type IBody = ISuccessBody | IErrorBody;
