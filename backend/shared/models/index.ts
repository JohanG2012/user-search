/* tslint:disable no-var-requires */
const mongoose = require('mongoose');
/* tslint:enable no-var-requires */
mongoose.Promise = global.Promise;

type Callback = (err: string) => any;

export const connect = async (uri: string, errorHandler: Callback) => {
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVELOPMENT') {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true });
    } catch (e) {
      errorHandler(e);
    }
  }
};
