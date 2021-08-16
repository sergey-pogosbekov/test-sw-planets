import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, map, concatMap, mergeAll, concatAll, takeWhile, flatMap } from 'rxjs/operators';
import { Observable, of, forkJoin, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsApiService {
  
  private planetCache: any[] = [];

  private get cache(): Observable<any[]> {
    return  of(this.planetCache);
  }

  constructor(private http: HttpClient) {}

  fetch(url: string): Observable<any[]> {
    return this.http.get(url).pipe(

      concatMap((array1: any) =>
        zip(
          of(array1['results']),
          array1['next'] ? this.fetch(array1['next']) : of([])
        ).pipe(map((dd: any) => [].concat(...dd)))
      )
    );

  }

  getPlanets(url: string): Observable<any[]> {
    const res =
      this.planetCache.length === 0 ? this.fetch(url) : this.cache;

      if(this.planetCache.length === 0 ) {
        res.subscribe( resp => {
            this.planetCache = resp;
        })
        
      }
    res.subscribe(s => console.log(s));

    return res;
    
  }
}
