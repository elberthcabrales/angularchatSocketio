import { Component, OnInit } from '@angular/core';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as UI from './../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<any>;
  constructor(
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  onClickMe():void{
   this.store.dispatch(new UI.StopLoading());
  }

}
