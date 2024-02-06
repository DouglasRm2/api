import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { ServiceBinanceService } from './service/service-binance.service';
import { MonitorComponent } from './monitor/monitor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MonitorComponent],
  providers:[ServiceBinanceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
   title = 'api';
   tickerData!: any;

  constructor(private serviceBinance: ServiceBinanceService){}

  ngOnInit(): void {

    this.tickerData = this.serviceBinance.getTickerPrice('btcusdt').subscribe(
      data => {
        
        console.clear();
        console.log(`conexão feita com sucesso`);
        console.log("Crypto:" + data.s),
        console.log('Preço do Ticker:',  parseFloat(data.a).toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }));
            /* console.log('Dados recebidos:', data); */
            this.tickerData = data;
      }
     ,
      error => {
        console.error('Erro na subscrição do WebSocket:', error);
      },
      () => {
        console.log('Subscrição WebSocket concluída.');
      })}
}