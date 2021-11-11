import { Injectable } from '@angular/core';
import { Lijst } from './lijst';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LijstService {

  constructor(private httpClient: HttpClient) {
  }

  getLijsten(): Observable<Lijst[]> {
    return this.httpClient.get<Lijst[]>("http://localhost:3000/lijsten");
  }

  getLijstById(id: number): Observable<Lijst> {
    return this.httpClient.get<Lijst>("http://localhost:3000/lijsten/"+id);
  }

  postLijsten(lijst : Lijst): Observable<Lijst> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8')

    return this.httpClient.post<Lijst>("http://localhost:3000/lijsten",lijst,{headers: headers});
  }

  putLijsten(id: number, lijst: Lijst): Observable<Lijst> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Lijst>("http://localhost:3000/lijsten/"+id, lijst, {headers: headers});
  }

  deleteLijsten(id: number): Observable<Lijst> {
    return this.httpClient.delete<Lijst>("http://localhost:3000/lijsten/"+id);
  }

}
