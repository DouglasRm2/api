
import { Component, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { Binanceservico } from '../service/grafico-binance.service';
import { CommonModule } from '@angular/common';
 



@Component({
  selector: 'graficoapex',
  standalone: true,
  imports: [CommonModule,NgxApexchartsModule],
  providers:[Binanceservico],
  templateUrl: './grafico-apex.component.html',
  styleUrl: './grafico-apex.component.css'
})
export class GraficoApexComponent implements OnInit {

chartOptions: any;

constructor (private binance: Binanceservico) {}

  ngOnInit(): void {
this.binance.getChartData(`BTCUSDT`).subscribe(data => {

  this.chartOptions = {
    series: [{
      name: `BTCUSDT`,
      data: data.map((item: string[]) => parseFloat(item[1]))
    }],
    chart:{
      height:360,
      tyoe: `line`,
    },
    xaxis: {
      type:`datetime`
    },
  };
    
});
}
}
