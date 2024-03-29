import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsDashboardComponent } from './components/leads-dashboard/leads-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeadDashboard1Component } from './components/lead-dashboard1/lead-dashboard1.component';
import { FormsModule } from '@angular/forms';
import { CampaignleadsComponent } from './components/campaignleads/campaignleads.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { LeadTableComponent } from './components/lead-table/lead-table.component';
import { DataSyncComponent } from './components/data-sync/data-sync.component';

@NgModule({
  declarations: [
    LeadsDashboardComponent,
    LeadDashboard1Component,
    CampaignleadsComponent,
    AppointmentTableComponent,
    LeadTableComponent,
    DataSyncComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    ChartsModule,
    BsDatepickerModule,
    FormsModule,
    TableModule,
    NgxPaginationModule
  ]
})
export class LeadsModule {}
