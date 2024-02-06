import { Component, OnInit } from '@angular/core';
import { ServiceBinanceService } from '../service/service-binance.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'monitor',
  standalone: true,
  imports: [AppComponent],
  providers:[ServiceBinanceService],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})


export class MonitorComponent implements OnInit {
  
  monitor_de_dados: any;

  constructor(private ExibirDados: ServiceBinanceService) {}


  ngOnInit(): void{
    this.ExibirDados.getTickerPrice('BTCUSDT').subscribe(
      (data: any) => {
        this.monitor_de_dados = data;
      },
      (error: any) => {
        console.error('Erro ao receber dados do ticker:', error);
      }
    );
  }
}