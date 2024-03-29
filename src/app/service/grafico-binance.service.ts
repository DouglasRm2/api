import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})


export class Binanceservico {
  
  private apiUrl ='http://localhost:3001/buscandodados'; 
  
  novosDadosDisponiveis: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  getChartData(symbol: string, interval: string): Observable<any> {
    const url = `${this.apiUrl}?symbol=${symbol}&interval=${interval}&limit60`;

    // Solicitando dados para nosso back-end
    return this.http.get(url).pipe(
      tap((dados: any) => {
        // Emite os novos dados para o componente do gráfico
        this.novosDadosDisponiveis.next(dados);
      }),
      catchError(error => {
        console.error('Erro ao se conectar ao back-end:', error);
        return throwError(error);
      })
    );
  }
}