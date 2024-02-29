import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking, RankingRes } from '../../models/ranking.model';
import { HttpRes } from '../../models/httpRes.model';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private base_url = 'http://localhost:8080/aftas/api/v1/';
  constructor(private http: HttpClient) {}

  public save(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.base_url + 'rankings', data);
  }

  public getRankingsOfCompetition(code: string): Observable<HttpRes> {
    return this.http.get<HttpRes>(
      this.base_url + 'rankings/competitions/' + code
    );
  }
}
