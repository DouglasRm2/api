
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { Binanceservico } from '../service/grafico-binance.service';
import { CommonModule } from '@angular/common';

 



@Component({
  selector: 'graficoapex',
  standalone: true,
  imports: [CommonModule,NgxApexchartsModule,],
  providers:[Binanceservico],
  templateUrl: './grafico-apex.component.html',
  styleUrl: './grafico-apex.component.css'
})




export class GraficoApexComponent implements OnInit {
  chartOptions: any;

  constructor(private binance: Binanceservico) {}

  ngOnInit(): void {
    this.binance.getChartData('BTCUSDT').subscribe(
      (data: any[]) => {
        this.chartOptions = {
          series: [{
            name: 'BTCUSDT',
            data: data.map(item => [new Date(item[0]).getTime(), parseFloat(item[1])])
          }],
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false
            }
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            opposite: true
          },
          title: {
            text: 'Price Movements',
            align: 'left'
          },
          subtitle: {
            text: 'moedas',
            align: 'left'
          },
          legend: {
            horizontalAlign: "left"
          }
        };
      },
      error => {
        console.error('Erro ao fazer solicitação para BTCUSDT:', error);
      }
    );
  }
}