import { Injectable,EventEmitter } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import * as SocketIo from 'socket.io-client';
import { User } from '../user/user.model';
import { Observer } from 'rxjs/Observer';
import { MessagePrivate } from './messages/message.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class SocketService {
  private BASE_URL = 'http://localhost:4500';
  private socket;
  private usersSource = new Subject<User[]>();
  public users$ = this.usersSource.asObservable();
  public userlogs$: EventEmitter<User> = new EventEmitter<User>();
  public listMesages$: EventEmitter<any[]> = new EventEmitter<any[]>();
  public messageRealTime$:EventEmitter<any> = new EventEmitter<any>();
  public dataset:User[];
  connectSocket(){
    
    //el parametro query se va hasta eñ userId
    this.socket = SocketIo(this.BASE_URL,{ query:{token:localStorage.getItem('token')}});

    this.socket.on('receive',(data)=>{
      this.messageRealTime$.emit(data);
    })
    this.socket.on('getListUsers',(data)=>{
          this.usersSource.next(data);
          this.dataset = data;
    })
  
    this.socket.on('getList',(listMessages:MessagePrivate[])=>{
      this.listMesages$.emit(listMessages);
    });
   
  this.socket.on('user has disconected',(user)=>{
    this.updateStatus(this.dataset,user,(result)=>{
        this.dataset=result;
      })
      this.userlogs$.emit(user)
    })
    this.socket.on('user connected',(user)=>{
      this.updateStatus(this.dataset,user,(result)=>{
        this.dataset=result;
      })
      this.userlogs$.emit(user)
    })
    //ERROR TypeError: Cannot read property 'next' me daba porque usaba function(data) en lugar de lamda (data)=>
  }
  send(data){
    this.socket.emit('send message',data);
  }
  logout(){
    localStorage.removeItem('token'); //al remover el token se puede la sesion
    this.socket.disconnect(true);
    //this.socket.emit('disconnecting user');

  }
  listMessages(selected){
    this.socket.emit('listMessage',selected);
  }
  search(srtParam){
    let data = this.dataset.filter(a=> a.username
                .toLowerCase()
                .indexOf(srtParam.toLowerCase())>-1);
    this.usersSource.next(data);
  }
  updateStatus(dataset:User[],e:User,callback){
    let updated=this.dataset.map(u=>{
      if(u.id===e.id){
        return e
      }
      return u;
    })
    callback(updated);
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
    /*
  notifyStatus(user?:User): any{
    let obseravable = new Observable(observer=>{
      observer.next(user);
    })
    return obseravable;
  }*/
 
}
