import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { logoutAction } from 'src/app/core/store/user/user.action';

@Component({
  selector: 'app-not-activated',
  templateUrl: './not-activated.component.html',
  styleUrls: ['./not-activated.component.css'],
})
export class NotActivatedComponent {
  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logoutAction());
  }
}
