import { createAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export const loggedIn = createAction<User>('account/loggedIn');
export const loggedOut = createAction('account/loggedOut');
