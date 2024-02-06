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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  tickerData: any;
  serviceBinance: any;
}
