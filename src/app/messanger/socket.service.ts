import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import * as SocketIo from 'socket.io-client';
import { User } from '../user/user.model';
@Injectable()
export class SocketService {
  private BASE_URL = 'http://localhost:4500';
  private socket;
  private usersSource = new Subject<User[]>();
  public users$ = this.usersSource.asObservable();
  public dataset:User[];
  connectSocket(){
    //el parametro query se va hasta eñ userId
    this.socket = SocketIo(this.BASE_URL,{ query:{token:localStorage.getItem('token')}});
    this.socket.on('getListUsers',(data)=>{
          this.usersSource.next(data);
          this.dataset = data;
    })
    this.socket.on('user has disconected',(user)=>{
      console.log(user)
      this.socket.disconnect(true);
    })
  }
  logout(){
    this.socket.emit('disconnecting user');
  }
  listMessages(other){
    this.socket.emit('listMessage',other);
    this.socket.on('getList',function(response){
      console.log(response);
    })
  }
  search(srtParam){
    let data = this.dataset.filter(a=> a.username
                .toLowerCase()
                .indexOf(srtParam.toLowerCase())>-1);
    this.usersSource.next(data);
  }
  constructor() { }
  

  /**
   * connect
   * Get list of Users For me
   * update list brodcast for they
   * send message
   * receive message
   * disconnect
   */
}
