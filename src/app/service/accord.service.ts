import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';

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

  getAccords(): Observable<any> {
    return this.http.get<any>(`${this.apiServer}/api/accords`);
  }

  getAccord(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServer}/api/accord/${id}`);
  }

  getAccordsByGroupAndType(group: string, type: string): Observable<any> {
    return this.http.post<any>(`${this.apiServer}/api/accord/findByGroupAndType`, JSON.stringify({group, type}), httpOption);
  }

  saveAccord(data: object): Observable<any> {
    return this.http.post<any>(`${this.apiServer}/api/accord`, JSON.stringify(data), httpOption);
  }

  updateAccord(id: number, data: object): Observable<any> {
    return this.http.put<any>(`${this.apiServer}/api/accord/${id}`, JSON.stringify(data), httpOption);
  }

  deleteAccord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServer}/api/accord/${id}`);
  }
}
