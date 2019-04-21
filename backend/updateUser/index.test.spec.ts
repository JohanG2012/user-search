/* tslint:disable no-var-requires */
const mongoose = require('mongoose');
/* tslint:enable no-var-requires */
import { MongoMemoryServer } from 'mongodb-memory-server';
import httpFunction from './index';
import User from '../shared/models/User';
import * as testData from '../data/testData.json'; // 100 user documents
import { fakeObjectId } from '../shared/utils/fakes';
import { stripObjProps } from '../shared/utils/helpers';
mongoose.Promise = global.Promise;

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, err => {
    if (err) {
      console.error(err);
    }
  });

  // Promise fix for broken insertMany
  await new Promise((resolve, reject) => {
    User.insertMany(testData, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('PATCH /api/v1/user/:id', () => {
  let context: any = {};
  let req: any = {};
  beforeEach(() => {
    context = {
      res: { body: {} },
      done: jest.fn(),
      log: jest.fn(),
    };

    req = {
      params: {},
      query: {},
      body: {},
    };
  });

  describe('validation', () => {
    describe('with invalid id', () => {
      beforeEach(async () => {
        req.params.id = 'fake id';
        await httpFunction(context, req);
      });

      it('should return 400 status code', async () => {
        expect(context.res.status).toBe(400);
      });

      it('should match snapshot', () => {
        expect(context).toMatchSnapshot();
        expect(context.done).toHaveBeenCalledTimes(1);
      });
    });
    describe('with forbidden fields only', () => {
      beforeEach(async () => {
        req.params.id = fakeObjectId();
        req.body._id = 'new _id';
        await httpFunction(context, req);
      });

      it('should return 400 status code', async () => {
        expect(context.res.status).toBe(400);
      });

      it('should match snapshot', () => {
        expect(context).toMatchSnapshot();
        expect(context.done).toHaveBeenCalledTimes(1);
      });
    });
    describe('with empty body', () => {
      beforeEach(async () => {
        req.params.id = fakeObjectId();
        req.body = {};
        await httpFunction(context, req);
      });

      it('should return 400 status code', async () => {
        expect(context.res.status).toBe(400);
      });

      it('should match snapshot', () => {
        expect(context).toMatchSnapshot();
        expect(context.done).toHaveBeenCalledTimes(1);
      });
    });
    describe('with non existing _id', () => {
      beforeEach(async () => {
        req.params.id = fakeObjectId();
        req.body.permission = true;
        await httpFunction(context, req);
      });

      it('should return 400 status code', async () => {
        expect(context.res.status).toBe(404);
      });

      it('should match snapshot', () => {
        expect(context).toMatchSnapshot();
        expect(context.done).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('update an user', () => {
    let original: any;
    const newFirstName = 'updated';
    let FAKE_ID: string;
    let newUser: any;
    beforeEach(async () => {
      // MongoMemoryServer id's wont pass validation as a real mongoDB id.
      // First need create a document with fake_id.
      FAKE_ID = fakeObjectId();
      const [user]: any = await User.find().limit(1);
      newUser = { ...user._doc, _id: FAKE_ID };
      await new User(newUser).save();

      // Update
      req.params.id = FAKE_ID;
      req.body = { name: { first: newFirstName } };
      await httpFunction(context, req);
    });

    it('should respond with 204 status code', () => {
      expect(context.res.status).toBe(204);
    });

    it('should match snapshot', () => {
      expect(context).toMatchSnapshot();
      expect(context.done).toHaveBeenCalledTimes(1);
    });

    it('should be able to update a item', async () => {
      const [updated] = await User.find({ _id: FAKE_ID });
      expect(updated.name.first).toBe(newFirstName);
    });

    it('should only change body data', async () => {
      const [updated]: any = await User.find({ _id: FAKE_ID });
      original = { ...newUser };
      original.name.first = newFirstName;
      const [stripedUpdated] = stripObjProps([updated._doc], ['_id']);
      const [stripedOriginal] = stripObjProps([original], ['_id']);
      expect(stripedUpdated).toMatchObject(stripedOriginal);
    });
  });
  describe('trigger server error - close down database connection', () => {
    beforeEach(async () => {
      mongoose.disconnect();
      mongoServer.stop();
      req.params.id = fakeObjectId();
      req.body = { name: { first: 'updated' } };
      await httpFunction(context, req);
    });

    it('should respond with 503 error', async () => {
      expect(context.res.status).toBe(503);
    });

    it('should match snapshot', async () => {
      expect(context).toMatchSnapshot();
      expect(context.done).toHaveBeenCalledTimes(1);
    });
  });
});
