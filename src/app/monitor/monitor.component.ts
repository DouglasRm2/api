import { Component, OnInit } from '@angular/core';
import { ServiceBinanceService } from '../service/service-binance.service';
import { getCurrencySymbol, getLocaleCurrencyName } from '@angular/common';



@Component({
  selector: 'monitor',
  standalone: true,
  imports: [],
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
          data.a = parseFloat(data.a).toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
            this.monitor_de_dados = data;        
      
      




          },
      (error: any) => {
      return  error;
      }
    );
  }
}