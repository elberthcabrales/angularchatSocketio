import { Action } from '@ngrx/store';

import { 
  UserActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  AUTHENTICATED_ERROR,
  SET_SINGUP,
  SINGUP_ERROR,
  AUTHENTICATED_SUCCESS,
 } from './user.actions';
import { User } from '../user.model';

export interface State {
  isAuthenticated: boolean;
  error?: any;
  user?: User;
}

const initialState: State = {
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
    return Object.assign({}, state,{
        isAuthenticated: true
      });
    case SET_UNAUTHENTICATED:
    return Object.assign({}, state, {
        isAuthenticated: false
      });
    case AUTHENTICATED_ERROR:
    return Object.assign({}, state, {
        isAuthenticated: false,
        error: action.error
      });
    case SET_SINGUP:
      const user: User = action.payload.user;
      if (user === null) {
        return state;
      }
      return Object.assign({}, state, {
        isAuthenticated: true,
        error: undefined,
        user: user
      });
    case SINGUP_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        error: action.error,
      });
    case AUTHENTICATED_SUCCESS:
    return Object.assign({}, state, {
      isAuthenticated:true,
      user: action.user
    });
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getAuthenticationError = (state: State) => state.error;
export const getSignUpError = (state: State) => state.error;