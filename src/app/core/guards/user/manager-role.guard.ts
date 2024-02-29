import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ManagerRoleGuard implements CanActivate {
  user!: User | undefined;
  constructor(private _router: Router, private _store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      console.log('User :', JSON.stringify(state));
    });
    if (this.user?.role === 'MANAGER') {
      return true;
    } else {
      window.history.back();
      return false;
    }
  }
}
