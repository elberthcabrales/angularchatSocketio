import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../socket.service';
import { User } from '../../user/user.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Output() selected :EventEmitter<User>  = new EventEmitter<User>();
  //dataset: any;
  //users: any;
   users$:any;
  constructor(private socketIo: SocketService) { }
  searchForm: FormGroup;
 
  
  ngOnInit() {
    this.socketIo.connectSocket();
    this.users$ = this.socketIo.users$;
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
    

}


