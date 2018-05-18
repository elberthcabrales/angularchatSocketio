import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './user/signup/signup.component';
import {WindowComponent} from './messanger/window/window.component'
import { AuthenticatedGuard } from "./authenticated.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    {
       canActivate: [AuthenticatedGuard],
       path: 'messenger',
       component: WindowComponent 
    },
    { path: '**', component: NotfoundComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}