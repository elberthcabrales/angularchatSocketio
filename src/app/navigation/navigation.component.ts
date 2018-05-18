import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from '@angular/router'

import * as fromRoot from '../app.reducer';
import { UserService } from './../user/user.service';
import * as UserActionTypes from "./../user/redux/user.actions";
import { Subscription } from 'rxjs/Subscription';
import { User } from '../user/user.model';
import { SocketService } from '../messanger/socket.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{


  isAuth$: Observable<boolean>;
  
  constructor(
    private store: Store<fromRoot.State>,
    private userService :UserService,
    private router: Router,
   ) { }

ngOnInit() {
  /* this.suscripion =this.store.select(fromRoot.getAuthState).subscribe((e)=>{
      this.user = e.user;
   });
*/
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    let token = localStorage.getItem('token') ? localStorage.getItem('token'):"no hay :(";
    if(token.length>50){
      
      this.userService.checkSession(token.toString()).subscribe((res)=>{
        if(res.status==200){
         // console.log(res.json())
          this.store.dispatch(new UserActionTypes.AuthenticationSuccessAction(res.json()));
          this.router.navigate(['/messenger'])
        }
      })
    }
  }
  onLogout(){
    this.userService.logout().subscribe((res)=>{
      this.store.dispatch(new UserActionTypes.SetUnauthenticated())
      if(res) this.router.navigate(['/login'])
    })
  }

}
