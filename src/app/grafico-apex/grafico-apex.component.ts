
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
            type: "line",
            height: 310,
            width:890,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth", // Ou "straight" para linhas retas
            width: 2 // Largura da linha do gráfico
          },
    
          title: {
            text: "Fundamental Analysis of Stocks",
            align: "left"
          },
          subtitle: {
            text: "Price Movements",
            align: "left"
          },
         
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            opposite: true
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