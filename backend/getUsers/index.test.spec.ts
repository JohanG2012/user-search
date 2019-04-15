/* tslint:disable no-var-requires */
const mongoose = require('mongoose');
/* tslint:enable no-var-requires */
import { MongoMemoryServer } from 'mongodb-memory-server';
import httpFunction from './index';
import User from '../shared/models/User';
import * as testData from '../data/testData.json'; // 100 user documents
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

describe('GET /api/v1/users', () => {
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
    };
  });

  describe('without querystrings', () => {
    beforeEach(async () => {
      await httpFunction(context, req);
    });
    it('should match snapshot', async () => {
      // strip _id & next to avoid snapshot collision.
      const parsed = JSON.parse(context.res.body);
      const [stripedBody]: any = stripObjProps([parsed], ['next']);
      const striped = stripObjProps(parsed.data, ['_id']);
      stripedBody.data = striped;
      context.res.body = JSON.stringify(stripedBody);

      expect(context.done).toBeCalledTimes(1);
      expect(context).toMatchSnapshot();
    });
    describe('few fallbacks in case bad snapshot is saved', () => {
      it('should return 200 status code', () => {
        expect(context.res.status).toBe(200);
      });
      it('should return list of first 50 users', () => {
        expect(JSON.parse(context.res.body).data.length).toBe(50);
      });
    });
  });
  describe('with all querystrings', () => {
    beforeEach(async () => {
      req.query = { limit: 10, 'name.title': 'mr', fields: 'name.title,picture.thumbnail' };
      await httpFunction(context, req);
    });
    describe('with limit', () => {
      it('should return a list of 10 users', () => {
        expect(JSON.parse(context.res.body).data.length).toBe(10);
      });
    });
    describe('with filter', () => {
      it('should return users with the title mr', () => {
        const result = JSON.parse(context.res.body).data;
        result.forEach(item => {
          expect(item.name.title).toBe('mr');
        });
      });
    });
    describe('with partial', () => {
      it('should not return picture.large and picture.medium', () => {
        const result = JSON.parse(context.res.body).data;
        result.forEach(item => {
          expect(item.picture.large).toBeUndefined();
          expect(item.picture.medium).toBeUndefined();
        });
      });
    });
    it('should match snapshot', () => {
      expect(context).toMatchSnapshot();
    });
  });
  describe('validation', () => {
    describe('with to high limit', () => {
      beforeEach(async () => {
        req.query.limit = 60;
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
    describe('with invalid next cursor', () => {
      beforeEach(async () => {
        req.query.next = 'fake cursor';
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
  });
  describe("search for 'justine faure'", () => {
    it('should match snapshot', async () => {
      req.query.search = 'justine faure';
      await httpFunction(context, req);

      // strip _id to avoid snapshot collision.
      const parsed = JSON.parse(context.res.body);
      const striped = stripObjProps(parsed.data, ['_id']);
      parsed.data = striped;
      context.res.body = JSON.stringify(parsed);

      expect(context).toMatchSnapshot();
      expect(context.done).toHaveBeenCalledTimes(1);
    });
  });
  describe('with limit & pagination', () => {
    it('should respond with page 2', async () => {
      req.query.limit = 3;
      await httpFunction(context, req);
      const ref = JSON.parse(context.res.body).data;
      req.query.limit = 2;
      await httpFunction(context, req);
      let parsed = JSON.parse(context.res.body);
      expect(parsed.data.length).toBe(2);
      expect(parsed.data[1]).toMatchObject(ref[1]);
      const next = parsed.next;
      req.query.next = next;
      await httpFunction(context, req);
      parsed = JSON.parse(context.res.body);
      expect(parsed.data[0]).toMatchObject(ref[2]);
    });
  });
  describe('trigger server error - close down database connection', () => {
    beforeEach(async () => {
      mongoose.disconnect();
      mongoServer.stop();
      await httpFunction(context, req);
    });
    it('should respond with 500 error', async () => {
      expect(context.res.status).toBe(500);
    });
    it('should match snapshot', async () => {
      expect(context).toMatchSnapshot();
      expect(context.done).toHaveBeenCalledTimes(1);
    });
  });
});
