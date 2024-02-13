
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent, NgxApexchartsModule } from 'ngx-apexcharts';
import { Binanceservico } from '../service/grafico-binance.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'graficoapex',
  standalone: true,
  imports: [CommonModule,NgxApexchartsModule,],
  providers:[Binanceservico],
  templateUrl: './grafico-apex.component.html',
  styleUrl: './grafico-apex.component.css'
})




export class GraficoApexComponent implements OnInit {
  @ViewChild('chart')
  chart!: ChartComponent;

  
  symbol: string = 'BTCUSDT';
  chartOptions: any;
  updateSubscription: any;

  constructor(private binance: Binanceservico) { 
      this.chartOptions = {
      series: [{
        name:[],
        data: [], }],

        chart: {
        type: 'line',
        height:  350,
        width: '100%',
        zoom: {
        enabled: true                                                 
        }
          },
            };
              };



              ngOnInit(): void {
                // Solicita os dados iniciais do gráfico
                this.binance.getChartData('BTCUSDT').subscribe(
                  (dadosIniciais: any[]) => {
                    this.atualizarGraficoComNovosDados(dadosIniciais);
                  },
                  error => {
                    console.error('Erro ao obter dados iniciais do gráfico:', error);
                  }
                );
            
                // Subscreve-se para receber notificações sobre novos dados da API da Binance
                this.binance.novosDadosDisponiveis.subscribe(
                  (novosDados: any[]) => {
                    this.atualizarGraficoComNovosDados(novosDados);
                  },
                  error => {
                    console.error('Erro ao receber novos dados do serviço:', error);
                  }
                );
              }
            
              // Método para atualizar o gráfico com base nos novos dados recebidos
              atualizarGraficoComNovosDados(novosDados: any[]): void {
                if (novosDados && novosDados.length > 0) {
                  this.chartOptions = {
                    series: [{
                      name: 'BTCUSDT',
                      data: novosDados.map(item => [new Date(item[0]).getTime(), parseFloat(item[1])]),
                      color: '#5ff569'
                    }],
                    chart: {
                      type: 'line',
                      height: 350,
                      background: '#000f0e',
                    }
                  };
                }
              }
            }