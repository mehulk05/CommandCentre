import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRegisterComponent } from './modules/authentication/components/account-register/account-register.component';
import { UserLoginComponent } from './modules/authentication/components/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'leads',
    loadChildren: () =>
      import('./modules/leads/leads.module').then((m) => m.LeadsModule)
  },
  { path: '', component: UserLoginComponent },
  { path: 'sign-up', component: AccountRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
