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

@NgModule({
  declarations: [
    LeadsDashboardComponent,
    LeadDashboard1Component,
    CampaignleadsComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    ChartsModule,
    BsDatepickerModule,
    FormsModule,
    TableModule
  ]
})
export class LeadsModule {}
