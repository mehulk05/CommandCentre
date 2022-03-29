import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsDashboardComponent } from './components/leads-dashboard/leads-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [LeadsDashboardComponent],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    ChartsModule,
    DataTablesModule,
    BsDatepickerModule
  ]
})
export class LeadsModule {}
