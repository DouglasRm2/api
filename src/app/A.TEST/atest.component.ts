import { Component, OnInit, ViewChild } from '@angular/core';
// eslint-disable-next-line max-len
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend, ChartComponent } from 'ng-apexcharts';
import { series } from './datos-ejemplo';

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
  selector: 'app-chart-ejemplo',
  templateUrl: './chart-ejemplo.component.html',
  styleUrls: ['./chart-ejemplo.component.scss'],
})
export class ChartEjemploComponent implements OnInit {
  @ViewChild('realTimePricesChart') chart: ChartComponent;

  chartOptions: ChartOptions;

  constructor() {
  }

  ngOnInit() {

    //  Llama al evento "resize", actualizando el chart.
    setTimeout(() => (window as any).dispatchEvent(new Event('resize')), 1);

    //  Llenado de datos en tiempo real
    const newPrices: number[] = [...series.monthDataSeries1.prices];
  

    setInterval(() => {
 

      const newValue = newPrices[newPrices.length - 1] * (0.5 + Math.random());
      newPrices.shift();
      newPrices.push(newValue);

      this.chart.updateSeries([{
        data: newPrices
      }], true);
    }, 1000);
  }
}










ngOnInit(): void {

  setTimeout(() => (window as any).dispatchEvent(new Event('resize')), 1);

  const novopreco : number[] = [...series.monthDataSeries1.prices];

  const precoatual = novopreco[novopreco.length -1];
  novopreco.shift();
  novopreco.push(precoatual);

 // Busca a série logo de inicio da API

 setInterval(() => {

  const precoatual = novopreco[novopreco.length - 1];
  novopreco.shift();
  novopreco.push(precoatual);

  this.chart.updateSeries([{
    data: novopreco
  }], true);
}, 1000);
  }

