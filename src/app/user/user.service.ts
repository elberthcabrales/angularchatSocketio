import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './redux/user.actions'

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch';

//RESPONSE LOGIN user,message,token
@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:4500/api/user/';
  private _authenticated = false;

  constructor(
    private router: Router,
    private http: Http,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) {}


  registerUser(userData: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl,userData,options)
      .map((res) => res.json())
  }
/**
 * @param userData
 * @return user, message, token 
 */
  login(authData: AuthData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl+'login',authData,options);
  }
  checkSession(token:string){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl+'check',options);
  }
  logout() : Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.clear();
    return Observable.of(true);
  }
}
 /*let headers = new Headers({
			'Content-Type':'application/json',
      'Authorization':this.getToken()
      localStorage.getItem('identity')
      localStorage.removeItem('token');
		  localStorage.clear();
		});*/