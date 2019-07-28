import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { Accord } from '../model/accord';
import { ApiResult } from '../model/apiResult';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccordService {
  apiServer = Config.apiServer;

  constructor(
    private http: HttpClient
  ) { }

  getAccords(): Observable<Accord[]> {
    return this.http.get<Accord[]>(`${this.apiServer}/api/accords`);
  }

  getAccordById(id: number): Observable<Accord> {
    return this.http.get<Accord>(`${this.apiServer}/api/accord/${id}`);
  }

  findAccordsByGroupAndType(group: string, type: string): Observable<Accord[]> {
    return this.http.post<Accord[]>(`${this.apiServer}/api/accord/findByGroupAndType`, JSON.stringify({group, type}), httpOption);
  }

  saveAccord(accord: Accord): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.apiServer}/api/accord`, JSON.stringify(accord), httpOption);
  }

  updateAccord(accord: Accord): Observable<ApiResult> {
    return this.http.put<ApiResult>(`${this.apiServer}/api/accord/${accord.id_accord}`, JSON.stringify(accord), httpOption);
  }

  deleteAccord(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(`${this.apiServer}/api/accord/${id}`);
  }
}
