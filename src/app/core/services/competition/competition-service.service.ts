import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition, PageCompetition } from '../../models/competition.model';
import { PageFish } from '../../models/fish.model';
import { HttpRes } from '../../models/httpRes.model';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private base_url = 'http://localhost:8080/aftas/api/v1/';
  constructor(private http: HttpClient) {}

  public getCompetitions(page: number, size: number): Observable<HttpRes> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<HttpRes>(this.base_url + 'competitions', {
      params,
    });
  }

  public getCompetition(code: string): Observable<HttpRes> {
    return this.http.get<HttpRes>(this.base_url + 'competitions/' + code);
  }

  public getFish(): Observable<PageFish> {
    const params = new HttpParams().set('page', '0').set('size', '5');
    return this.http.get<PageFish>(this.base_url + 'fishes', {
      params,
    });
  }

  public saveCompetition(data: any): Observable<HttpRes> {
    return this.http.post<HttpRes>(this.base_url + 'competitions', data);
  }

  public hunting(data: any) {
    return this.http.post(this.base_url + 'huntings', data);
  }
}
