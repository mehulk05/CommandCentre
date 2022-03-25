import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  businessId: any;
  isShowPassword: any;
  errMsg = '';
  accountCreationMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.accountCreationMessage = history.state.isDataModified ?? null;
    this.authService.currentUserSubject.subscribe((data) => {
      if (data != null) {
        //  this.router.navigate(['/appointment/calendar']);
        this.router.navigate(['/users/profile']);
      }
    });
  }

  async submitForm() {
    this.accountCreationMessage = '';
    if (this.loginForm.invalid) {
      return;
    }

    from(this.authService.getUserByEmail(this.loginForm.value.email))
      .pipe(
        switchMap((userData: any): any => {
          if (userData) {
            this.businessId = userData.tenantId;
          } else {
            this.errMsg = 'Record for given Email Id is not found';
            return this.apiService.error(
              'Record for given Email Id is not found. Please contact our support team for further assistance.'
            );
          }
          if (this.businessId) {
            return from(this.authService.getBusinessData(this.businessId));
          }
          this.errMsg =
            'There is no business record found for ' +
            this.loginForm.value.email;
          return this.apiService.error(
            'There is no business record found for ' +
              this.loginForm.value.email +
              ' Please contact our support team for further assistance.'
          );
        })
        // catch(err => of([]));
      )
      .subscribe((businessData: any) => {
        if (!businessData.deleted) {
          this.userLoginAfterBusinessVerification(this.loginForm.value);
        }
      });
  }

  userLoginAfterBusinessVerification(logincredentials: any) {
    this.authService
      .loginByEmailAndPass(logincredentials)
      .then((data: any) => {
        this.localStorageService.storeItem('currentUser', data);
        this.authService.currentUserSubject.next(data);
        this.redirect(data.roles);
        this.errMsg = '';
      })
      .catch((e) => {
        if (e.error.message.trim() == 'Email is not verified.'.trim()) {
          this.apiService.error(
            'Verification pending - Please verify your email'
          );
          this.errMsg =
            'Verification pending - Look for the verification email in your inbox and click the link in that email. A confirmation message will appear in your web browser';
        } else {
          this.apiService.error(
            'The email or password is incorrect. Please check and try again.'
          );
          this.errMsg =
            'The email or password is incorrect. Please check and try again.';
        }
      });
  }

  redirect(roles: any) {
    if (roles.indexOf('Patient') > -1) {
      this.router.navigate(['/patient-portal/patient/dashboard']);
    } else {
      //  this.router.navigate(['/appointment/calendar']);
      this.router.navigate(['/users/profile']);
    }
  }

  toggleShowPasswordFeild() {
    this.isShowPassword = !this.isShowPassword;
  }
}
