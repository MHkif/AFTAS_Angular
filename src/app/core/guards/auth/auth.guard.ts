import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/state/app.state';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
    if (this.user?.token != null) {
      return true;
    } else {
      this._router.navigate(['auth/register']);
      return false;
    }
  }
}
