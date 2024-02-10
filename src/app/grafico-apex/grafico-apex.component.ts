
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
    // Método para atualizar o gráfico com base nos novos dados recebidos
    const atualizarGraficoComNovosDados = (novosDados: any[]) => {
      if (novosDados && novosDados.length > 0) {
        this.chartOptions = {
          series: [{
            data: novosDados.map(item => [new Date(item[0]).getTime(), parseFloat(item[1])]),
            color: "#3bf227", 
            type: "area", 
            zIndex: 1,
            zoom: {
              enabled: false
            },
          }],
          chart: {
            height: 350,
            width: 610,    
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 100,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
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
      }
    };

    // Solicita os dados iniciais do gráfico
    this.binance.getChartData('BTCUSDT').subscribe(
      (dadosIniciais: any[]) => {
        atualizarGraficoComNovosDados(dadosIniciais);
      },
      error => {
        console.error('Erro ao obter dados iniciais do gráfico:', error);
      }
    );

    // Subscreve-se para receber notificações sobre novos dados da API da Binance
    this.binance.novosDadosDisponiveis.subscribe(
      (novosDados: any[]) => {
        atualizarGraficoComNovosDados(novosDados);
      },
      error => {
        console.error('Erro ao receber novos dados do serviço:', error);
      }
    );
  }
}