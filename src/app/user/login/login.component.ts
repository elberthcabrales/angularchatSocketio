import { Component, OnInit } from '@angular/core';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as UI from './../../shared/ui.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {SetAuthenticated} from './../redux/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$:  Observable<boolean>;
  isLoadingError$: Observable<string>;


  constructor(
    private uiService: UIService,
    private store: Store<fromRoot.State>,

  ) { }

  ngOnInit() {
    //vaslidar si existe un token debemos de mandarlo al dasbord
    this.isLoadingError$ = this.store.select(fromRoot.getAuthenticationError);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
    

  }
  onSubmit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.dispatch(new SetAuthenticated({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }))
  }
  onClickMe():void{
   
  }

}
