import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {AppRoutingModule} from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component'
import { reducers } from './app.reducer';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';

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
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
