import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgxApexchartsModule } from 'ngx-apexcharts';
import { Binanceservico } from '../service/grafico-binance.service';
import { CommonModule } from '@angular/common';
import { series } from './data';
import { Subscription, interval } from 'rxjs';
import ApexCharts from 'apexcharts';


/* codigo abrindo o gráfico */
@Component({
  selector: 'graficoapex',
  standalone: true,
  imports: [CommonModule,NgxApexchartsModule,],
  providers:[Binanceservico],
  templateUrl: './grafico-apex.component.html',
  styleUrl: './grafico-apex.component.css'
})

export class GraficoApexComponent implements OnInit {
  @ViewChild ('atualizar')
  chart!: ChartComponent;
  public chartOptions!: Partial<ChartComponent>; 


  intervaloAtualizacao: number = 60000; // intervalo de atualização em milissegundos (por exemplo, 1 minuto)
  atualizacaoSub!: Subscription;
  
  constructor(private binance: Binanceservico) {}

ngOnInit(): void {
  this.chartOptions = {
    series: [
      {
        name: "STOCK ABC",
        data: [...series.monthDataSeries1.prices],
        color: "#5ff569",
      }
  ],
    chart: {
        type: "area",
        height: 350,
        zoom: {
        enabled: false
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
  labels: series.monthDataSeries1.dates,
  xaxis: {
    type: "datetime",
  },
    yaxis: {
        opposite: true
  },
    legend: {
        horizontalAlign: "left"
  }
}
  setTimeout(() => (window as any).dispatchEvent(new Event('resize')), 1);
 // Busca a série logo de inicio na API


this.binance.getChartData('BTCUSDT','1d').subscribe(
 (preco) => {
    this.chartOptions.series = [
     { name: `BTCUSDT`,
        data: preco, // Aqui você atribui os dados recebidos da API
          color: "#5ff569",  
           }

           
        ];

        this.chart.updateSeries([{
          data: preco
        }])
      }

      
    );
  }
}


























/* this.chart.updateSeries([{

          data: preco
        }], true);
        
        
        */





































/*

  // Chamada inicial para buscar dados
  this.buscarDados();
  // Atualizar os dados a cada 1 segundo   ----   setInterval(() => { this.buscarDados();}, 1000); 
   
  
buscarDados(): void {
  
  const symbol = 'BTCUSDT'; // ou qualquer outro símbolo que você deseje
  this.binance.getChartData(symbol).subscribe(
    (dados: any[]) => {
      console.log('Dados recebidos:', dados); // Verificar a estrutura dos dados recebidos

      // Verificar se existem dados na resposta
      if (dados && dados.length > 0) {
        // Extrair os preços dos dados recebidos
        const preços: number[] = dados.map(item => parseFloat(item[1])); // Extrai o preço (cotação) de cada item

        // Atualizar a série de dados do gráfico com os preços
        this.chart.updateSeries([{
          data: preços
        }], true);
      } else {
        console.error('Resposta do servidor vazia ou em formato inesperado.');
      }
    },
    (error: any) => {
      console.error('Erro ao buscar dados:', error);
    }
  );
 
}
}


*/


