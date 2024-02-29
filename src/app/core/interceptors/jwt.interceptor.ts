import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user!: User | undefined;
  constructor(private _store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });

    console.log('Interceptor');
    
    const cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.user?.token}`,
      },
    });
    return next.handle(cloneRequest);
  }
}
