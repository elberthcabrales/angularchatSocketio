import { Injectable } from "@angular/core";

// import @ngrx
import { Effect, Actions } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";

// import rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// import services
import { UserService } from "./../user.service";

// import actions
import * as UserActionTypes from "./user.actions";

import * as UiActionTypes from './../../shared/ui.actions';
import * as fromRoot from './../../app.reducer';
import { User } from '../user.model';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
    private userService: UserService,
    private store: Store<fromRoot.State>) {
  }

  @Effect()
  public authenticate: Observable<Action> = this.actions$
    .ofType<UserActionTypes.SetAuthenticated>(UserActionTypes.SET_AUTHENTICATED)
    .switchMap(action => {
      return this.userService.login({
        email:action.payload.email,
        password:action.payload.password})
        .map((user) => {
          localStorage.setItem('token',user.json().token)
          return new UserActionTypes.AuthenticationSuccessAction(user.json())
        })
        .do(()=> this.store.dispatch(new UiActionTypes.StopLoading()))
        .catch(error => Observable.of(new UserActionTypes.AuthenticatedError({error: error})));
        
    });



}
