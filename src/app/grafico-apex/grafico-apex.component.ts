
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgxApexchartsModule } from 'ngx-apexcharts';
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
  @ViewChild('chart')
  chart!: ChartComponent;
  
  chartOptions: any;

  constructor(private binance: Binanceservico) {}

  ngOnInit(): void {


    
    // Método para atualizar o gráfico com base nos novos dados recebidos

    const atualizarGraficoComNovosDados = (Vdados: any[]) => {
      if (Vdados && Vdados.length > 0) {
      
            
        this.chartOptions = {
          series: [{
            name: [``],
            
            data: Vdados.map(item => [new Date(item[0]).getTime(), parseFloat(item[1])]),
                   color: "#5ff569",



             


            }, ],

      chart: {
        type: "line",
        height: 350,
        background: '#000f0e',
        
      },
      
      
       };   }  };

 // Solicita os dados iniciais do gráfico
    this.binance.getChartData('BTCUSDT').subscribe(
      (dadosIniciais: any[]) => {
        atualizarGraficoComNovosDados(dadosIniciais);
      },
      error => {
        console.error('Erro ao obter dados iniciais do gráfico:', error);
      }
    ),





    

   
    

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

