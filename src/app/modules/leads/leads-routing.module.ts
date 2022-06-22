import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadDashboard1Component } from './components/lead-dashboard1/lead-dashboard1.component';

const routes: Routes = [
  {
    path: '',
    component: LeadDashboard1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule {}
