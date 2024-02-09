import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})

export class Binanceservico {
 private apiUrl ='http://localhost:3000/api/getChartData';

 constructor(private http: HttpClient) {}

 getChartData(symbol: string): Observable<any> {
   const url = `${this.apiUrl}?symbol=${symbol}&interval=1d`;
   return this.http.get(url);
 }
}
