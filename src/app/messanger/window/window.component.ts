import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';
import { SocketService } from '../socket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagePrivate } from '../messages/message.model';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  messageForm:FormGroup;
  selectedUser:User;
  messageList:MessagePrivate[];//:Observable<MessagePrivate[]>;

  constructor(private socketIo: SocketService) { }

  ngOnInit() {
    this.socketIo.messageRealTime$.subscribe((mrt:MessagePrivate)=>{
      if(this.selectedUser)
        if(this.selectedUser.id===mrt.from){
          this.messageList.push(mrt)
        }
    })
    this.socketIo.userlogs$.subscribe(u=>{
      if(this.selectedUser)
        if(u.id===this.selectedUser.id){
          this.selectedUser = u;
        }
    })
    this.socketIo.listMesages$.subscribe((lm)=>{
      this.messageList=lm;
    })
    this.messageForm = new FormGroup({
      massageText: new FormControl('', { validators: [Validators.required, this.noWhitespaceValidator] })
    });
  }
  
  userReceived(event){
    this.selectedUser = event;
    this.socketIo.listMessages(event);
  }
  onKey(event:any){
    let text = this.messageForm.value.massageText;
    if(event.keyCode===13 && this.messageForm.valid){
     // console.log(this.selectedUser)
      if(!this.selectedUser){
        alert('Select user to send message')
      }else{
        let data={text:text,to:this.selectedUser.id,toSocketId:this.selectedUser.socketId};
        this.socketIo.send(data);
        this.messageList.push(data);
        this.messageForm.reset();
      }
      
    }
  }
  public noWhitespaceValidator(control: FormControl) {
      let isWhitespace = (control.value || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true }
  }
}
