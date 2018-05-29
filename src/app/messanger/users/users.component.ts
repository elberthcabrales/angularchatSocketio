import { Component, OnInit,Output, EventEmitter, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../socket.service';
import { User } from '../../user/user.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';



    
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
 

  @Output() selected :EventEmitter<User>  = new EventEmitter<User>();
  //dataset: any;
  //users: any;
   users:any;
   currentuser:any;
   hide:boolean=true;
   suscription_user:Subscription;
  constructor(
    private socketIo: SocketService, 
    private store: Store<fromRoot.State>
  ) { }
  searchForm: FormGroup;
 
  
  ngOnInit() {
    this.socketIo.connectSocket();
    this.suscription_user = this.socketIo.users$.subscribe((users)=>{
      this.users = users;
    })
     this.socketIo.userlogs$.subscribe(e=>{
      if(e.id!==undefined && e.id!==null){
        if(e.id===this.currentuser.id && e.socketId){
           this.hide=false;
        }else{
         this.users = this.users.map(u=>{
              if(u.id===e.id){
                return e
              }
              return u;
          })
          //console.log(e.username+" esta "+e.status)
        }
      }
   })
   this.store.select(state=> state.auth.user).subscribe(u=>{
     this.currentuser = u;
   })
    this.searchForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] })
    });
  }
  selectUser(user){
     this.selected.emit(user)
  }
  onSearchChange(searchValue : string) {
    this.socketIo.search(searchValue);  
    /*this.users = this.dataset.filter(a=> a.username
                                          .toLowerCase()
                                          .indexOf(searchValue.toLowerCase())>-1)*/
  }
  ngOnDestroy(): void {
    this.suscription_user.unsubscribe();
  }
    

}


