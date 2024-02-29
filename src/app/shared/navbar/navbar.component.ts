import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/core/enums/roles';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';
import { logoutAction } from 'src/app/core/store/user/user.action';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | undefined;
  roles = Object.keys(Role);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
