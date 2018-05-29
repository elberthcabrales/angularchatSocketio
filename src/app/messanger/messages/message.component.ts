import { Component, OnInit, Input } from '@angular/core';
import { MessagePrivate } from './message.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {
  @Input()
  messages;
  @Input()
  other:User;


  constructor() { }

  ngOnInit() {  
  }

}
