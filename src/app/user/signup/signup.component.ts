import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading$: Observable<any>;
  constructor(
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private userService :UserService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      passwordConfirm: new FormControl('', { validators: [Validators.required]})
    }, this.passwordMatchValidator);
  }
 passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : {'mismatch': true};
 }
 onSubmit() {
  this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  this.userService.registerUser({
    email:this.signupForm.value.email,
    username: this.signupForm.value.username,
    password : this.signupForm.value.password
  }).subscribe((response)=>{
    console.log(response);
    },
    err=>{
      console.log(err)
  })
 }
}
