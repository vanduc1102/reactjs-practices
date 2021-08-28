import { createServer, Model, Response } from 'miragejs';
import { User } from '../types/user';

const users: User[] = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Toro 1',
    lastName: 'Tran 1',
  },
  {
    id: 2,
    username: '2test',
    password: '2test',
    firstName: 'Toro 2',
    lastName: 'Nguyen 2',
  },
  {
    id: 3,
    username: '3test',
    password: '3test',
    firstName: 'Doan 3',
    lastName: 'Nguyen 3',
  },
  {
    id: 4,
    username: '4test',
    password: '4test',
    firstName: 'Dai 4',
    lastName: 'Nguyen 4',
  },
  {
    id: 5,
    username: '5test',
    password: '5test',
    firstName: 'Duc 5',
    lastName: 'Nguyen 5',
  },
];
const MOCK_JWT = 'mock-jwt-token';

const ERROR_401_RESPONSE = new Response(
  401,
  { some: 'header' },
  { errors: ['invalid username or password'] }
);

const ERROR_403_RESPONSE = new Response(
  403,
  { some: 'header' },
  { errors: ['Not authorized'] }
);

export const createMockServer = () => {
  return createServer({
    models: {
      user: Model,
    },

    routes() {
      this.namespace = 'api';
      this.timing = 1500;

      this.get('/users', (_, request) => {
        const jwt = request.requestHeaders.authorization;
        if (!jwt?.includes(MOCK_JWT)) {
          return ERROR_403_RESPONSE;
        }
        return users;
      });

      this.get('/users/logout', (_, request) => {
        return new Response(200);
      });

      this.post('/users/login', (_, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const foundUser = users.find(
          (u) => u.password === password && u.username === username
        );
        if (foundUser) {
          return {
            ...foundUser,
            token: MOCK_JWT,
          };
        }

        return ERROR_401_RESPONSE;
      });
    },
  });
};
