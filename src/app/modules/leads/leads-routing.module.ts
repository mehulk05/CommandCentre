import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsDashboardComponent } from './components/leads-dashboard/leads-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeadsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule {}
