import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignleadsComponent } from './components/campaignleads/campaignleads.component';
import { LeadDashboard1Component } from './components/lead-dashboard1/lead-dashboard1.component';

const routes: Routes = [
  {
    path: '',
    component: LeadDashboard1Component
  },
  {
    path: 'campaign',
    component: CampaignleadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule {}
