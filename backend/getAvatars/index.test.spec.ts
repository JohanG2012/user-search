import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import httpFunction from './index';
import User from '../shared/models/User';
import { stripObjProps } from '../shared/utils/helpers';

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, err => {
    if (err) {
      console.error(err);
    }
  });
  let i;
  for (i = 0; i < 20; i++) {
    const fakeUser = {
      name: {
        title: 'Mr.',
        first: 'Johan',
        last: 'Gudmundsson',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/36.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/36.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/36.jpg',
      },
      permission: false,
    };
    await new User(fakeUser).save();
  }
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /api/v1/avatars', () => {
  let context: any = {};
  let req: any = {};
  beforeEach(() => {
    context = {
      res: {},
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
      // strip _id to avoid snapshot collison
      const parsed = JSON.parse(context.res.body);
      const striped = stripObjProps(parsed.data, ['_id']);
      parsed.data = striped;
      context.res.body = JSON.stringify(parsed);

      expect(context).toMatchSnapshot();
      expect(context.done).toHaveBeenCalledTimes(1);
    });

    describe('few fallbacks incase bad snapshot is saved', () => {
      it('should respond with 200 status', () => {
        expect(context.res.status).toEqual(200);
      });

      it('should respond with a list of 10 avatars', () => {
        expect(JSON.parse(context.res.body).data.length).toBe(10);
      });
    });
  });

  describe('close down database connection', () => {
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
