import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class Binanceservico {
  private apiUrl ='http://localhost:3000/api/getChartData';
  novosDadosDisponiveis: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  getChartData(symbol: string): Observable<any> {
    const url = `${this.apiUrl}?symbol=${symbol}&interval=1s`;


    // Solicita os dados da API Binance
    return this.http.get(url).pipe(
      tap((dados: any) => {
        
        // Emite os novos dados para o componente do gráfico
        this.notificarNovosDados(dados);
      })
    );
  }

  // Método para notificar sobre novos dados disponíveis
  private notificarNovosDados(dados: any) {
    this.novosDadosDisponiveis.next(dados);
  }
}
