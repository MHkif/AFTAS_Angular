import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpRes } from 'src/app/models/httpRes.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = 'http://localhost:8080/aftas/api/v1/';
  constructor(private http: HttpClient) {}

  public checkMember(identity: string): Observable<User> {
    const params = new HttpParams().set('identity', identity.toString());
    return this.http.get<User>(this.base_url + 'members/checkExistence', {
      params,
    });
  }

  public save(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.base_url + 'members', data);
  }

  public auth(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.base_url + 'members/auth', data);
  }

  public getUser(identity: string): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }).set('identity', identity.toString());
    return this.http.get<User>(this.base_url + 'members/checkExistence', {
      headers,
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
      identityNumber: userRes.identityNumber,
      token: res.data.token,
    };
    return user;
  }
}
