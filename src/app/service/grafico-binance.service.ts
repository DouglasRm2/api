import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
 providedIn: 'root'
})

export class Binanceservico {
private apiUrl ='https://api.binance.com/api/v3';
constructor(private http: HttpClient) {}

getChartData(symbol:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/klines?symbol=${symbol}&interval=1h`);
}
}
