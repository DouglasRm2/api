import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';



@Injectable({
 providedIn: 'root'
})

export class ServiceBinanceService {
 [x: string]: any;
 private apiUrl = 'wss://stream.binance.com:9443/ws/';

 constructor() { }

 getTickerPrice(symbol: string): Observable<any> {
  const endpoint = `${symbol.toLowerCase()}@ticker`;
  const wsSubject: WebSocketSubject<any> = webSocket({
    url: `${this.apiUrl}${endpoint}`
  });

    return wsSubject.asObservable();
 }
}
