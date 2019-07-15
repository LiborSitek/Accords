import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const config = {
  apiServer: 'http://localhost:8080'
};

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccordService {

  constructor(
    private http: HttpClient
  ) { }

  getAccords(): Observable<any> {
    return this.http.get<any>(`${config.apiServer}/api/accords`);
  }

  getAccord(id: number): Observable<any> {
    return this.http.get<any>(`${config.apiServer}/api/accord/${id}`);
  }

  saveAccord(data: object): Observable<any> {
    return this.http.post<any>(`${config.apiServer}/api/accord`, JSON.stringify(data), httpOption);
  }

  updateAccord(id: number, data: object): Observable<any> {
    return this.http.put<any>(`${config.apiServer}/api/accord/${id}`, JSON.stringify(data), httpOption);
  }

  deleteAccord(id: number): Observable<any> {
    return this.http.delete<any>(`${config.apiServer}/api/accord/${id}`);
  }
}
