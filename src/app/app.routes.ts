import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MonitorComponent } from './monitor/monitor.component';

export const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'monitor', component: MonitorComponent}
];
