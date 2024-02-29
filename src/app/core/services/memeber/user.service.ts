import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpRes } from '../../models/httpRes.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = 'http://localhost:8080/aftas/api/v1/members';
  private auth_url = 'http://localhost:8080/aftas/api/v1/auth';

  user!: User | undefined;

  constructor(private http: HttpClient, private _store: Store<AppState>) {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });
  }

  public getUserByIdNum(identity: string): Observable<HttpRes> {
    const params = new HttpParams().set('identity', identity.toString());
    return this.http.get<HttpRes>(this.base_url + '/checkExistence', {
      params: params,
    });
  }

  public activateUser(identity: string): Observable<HttpRes> {
    return this.http.get<HttpRes>(
      this.base_url + '/account-activation/' + identity
    );
  }

  public save(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.auth_url + '/register', data);
  }

  public auth(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.auth_url + '/login', data);
  }

  public getAllUser(page: number, size: number): Observable<HttpRes> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<HttpRes>(this.base_url, {
      params: params,
    });
  }

  formatUser(res: HttpRes) {
    let userRes = res.data.response;
    const user: User = {
      num: userRes.num,
      first_name: userRes.first_name,
      last_name: userRes.last_name,
      email: userRes.email,
      password: userRes.password,
      nationality: userRes.nationality,
      accessionDate: userRes.accessionDate,
      identityDocument: userRes.identityDocument,
      role: userRes.role,
      identityNumber: userRes.identityNumber,
      activate: userRes.activate,
      token: res.data.token,
    };
    return user;
  }
}
