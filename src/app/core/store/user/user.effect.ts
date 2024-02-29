import { Actions, createEffect, ofType } from '@ngrx/effects';

import { defer, exhaustMap, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  loginSuccessAction,
  logoutAction,
  registerSuccessAction,
  startLoginAction,
  startRegisterAction,
} from './user.action';
import { UserService } from '../../services/memeber/user.service';
import { AuthEmailPassword } from '../../models/auth_email_password.model';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private route: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLoginAction),
      exhaustMap((action) => {
        let authReq: AuthEmailPassword = {
          email: action.email,
          password: action.password,
        };
        return this.userService.auth(authReq).pipe(
          map((data) => {
            console.log('Data : ' + JSON.stringify(data.data.response));
            const user = this.userService.formatUser(data);
            localStorage.setItem('user', JSON.stringify(user));
            this.route.navigate(['home']);
            return loginSuccessAction({ user });
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startRegisterAction),
      exhaustMap((action) => {
        return this.userService.save(action.user).pipe(
          map((data) => {
            const user = this.userService.formatUser(data);
            this.route.navigateByUrl('/auth/login');
            return registerSuccessAction({ user });
          })
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          localStorage.removeItem('user');
          this.route.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    defer(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        return of(loginSuccessAction({ user: JSON.parse(userData) }));
      } else {
        return of(logoutAction());
      }
    })
  );
}
