import { appApi } from '.';
import { User } from '../../types/user';
import { loggedIn, loggedOut } from '../account/actions';

type UsersResponse = User[];

const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users',
    }),
    login: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        dispatch(loggedIn(user));
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    logout: builder.mutation<void, void>({
      query: () => '/users/logout',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(loggedOut());
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useLoginMutation, useLogoutMutation } =
  userApi;
