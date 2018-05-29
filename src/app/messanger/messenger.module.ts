import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/message.component';
import { WindowComponent } from './window/window.component'
import { MaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StopComponent } from './stop/stop.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    UsersComponent,
    MessagesComponent,
    WindowComponent,
    StopComponent   
  ],
  providers:[SocketService]
})
export class MessengerModule { }
