import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import 'hammerjs';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {AppRoutingModule} from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component'
import { reducers } from './app.reducer';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';


import {UserService} from './user/user.service';
import {HttpModule} from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import {UserEffects} from './user/redux/user.effect'
import {AuthenticatedGuard} from './authenticated.guard';
import {MessengerModule} from './messanger/messenger.module'

import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    MessengerModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [UIService,UserService, AuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
