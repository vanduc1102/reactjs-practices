import { createReducer } from '@reduxjs/toolkit';

import { loggedIn, loggedOut } from './actions';
import { AccountState } from './types';

const serializedUser = localStorage.getItem('user');
const cachedUser = serializedUser ? JSON.parse(serializedUser) : undefined;

const initialState: AccountState = {
  isLogin: !!cachedUser,
  user: cachedUser,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loggedIn, (_, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        isLogin: true,
        user: action.payload,
      };
    })
    .addCase(loggedOut, (_, action) => {
      localStorage.removeItem('user');
      return {
        isLogin: false,
        user: undefined,
      };
    })
);
