import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { AuthErrorComponent } from './components/auth-error/auth-error.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    ForgetPasswordComponent,
    AccountRegisterComponent,
    AuthErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule {}
