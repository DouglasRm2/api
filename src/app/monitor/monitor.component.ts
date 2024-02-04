import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';


@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent {
[x: string]: any;
  title = 'api';
  tickerData: any;

}
