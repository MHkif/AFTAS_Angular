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
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/state/app.state';

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
