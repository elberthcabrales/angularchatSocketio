import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  selectedUser:User;
  constructor(private socketIo: SocketService) { }

  ngOnInit() {
   
  }
  userReceived(event){
    this.selectedUser = event;
    //console.log(this.selectedUser)
    this.socketIo.listMessages(event);
  }

}
