import { CommonModule } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [CommonModule,AppComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent implements OnInit {
  tickerData: any;
  serviceBinance: any;
  ngOnInit(): void {
    this.tickerData = this.serviceBinance.getTickerPrice('btcusdt').subscribe(
      (      data: { s: string; a: string; }) => {
        
        console.clear();
        console.log(`conexão feita com sucesso`);
        console.log("Crypto:" + data.s),
        console.log('Preço do Ticker:',  parseFloat(data.a).toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }));
            /* console.log('Dados recebidos:', data); */
            this.tickerData = data;
            /*                                               */
           
      },
  )}

 

}
