import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  
  //get by url string
  getByUrl(d: string): Observable<any> {
    return this.http.get(d);
  }

  constructor(private http: HttpClient) { }
}
