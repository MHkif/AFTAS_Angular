import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking, RankingRes } from 'src/app/models/ranking.model';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private base_url = 'http://localhost:8080/aftas/api/v1/';
  constructor(private http: HttpClient) {}

  public save(data: any): Observable<Ranking> {
    return this.http.post<Ranking>(this.base_url + 'rankings', data);
  }

  public getRankingsOfCompetition(code: string): Observable<Array<RankingRes>> {
    return this.http.get<Array<RankingRes>>(
      this.base_url + 'rankings/competition/' + code
    );
  }
}
