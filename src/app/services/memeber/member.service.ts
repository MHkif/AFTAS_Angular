import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private base_url = 'http://localhost:8080/aftas/api/v1/';
  constructor(private http:HttpClient ) { }

  public checkMember(identity: string): Observable<Member>{
    const params = new HttpParams()
    .set('identity', identity.toString());
    return this.http.get<Member>(this.base_url + "members/checkExistence", { params });
  }

  public save(data: any): Observable<Member> {
    return this.http.post<Member>(this.base_url+"members", data);
  }


}
