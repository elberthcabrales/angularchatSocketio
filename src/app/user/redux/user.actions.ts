import { Action } from '@ngrx/store';
import {User} from './../user.model';
import {AuthData} from './../auth-data.model';

export const SET_AUTHENTICATED = '[USER] Set Authenticated';
export const SET_UNAUTHENTICATED = '[USER] Set Unauthenticated';
export const AUTHENTICATED_ERROR = '[USER] Authenticated error';
export const SET_SINGUP = '[USER] set singup user'
export const SINGUP_ERROR = '[USER] set singup error'
export const AUTHENTICATED_SUCCESS='[USER] success singup'

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
  constructor(public payload: AuthData) {}
}
export class AuthenticationSuccessAction implements Action {
  readonly type = AUTHENTICATED_SUCCESS;
  constructor(public  user?: User ) {}
}


export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
  constructor() {}
}

export class AuthenticatedError implements Action {
  readonly type = AUTHENTICATED_ERROR;
  constructor(public error?: any) {}
}
export class SetSignUp implements Action {
  readonly type  = SET_SINGUP;
  constructor(public payload: { user: User }) {}
}

export class SignUpError implements Action {
  readonly type = SINGUP_ERROR;
  constructor(public error?: any) {}
}
export type UserActions = 
SignUpError |
SetSignUp |
SetAuthenticated | 
AuthenticationSuccessAction|
SetUnauthenticated |
AuthenticatedError;
