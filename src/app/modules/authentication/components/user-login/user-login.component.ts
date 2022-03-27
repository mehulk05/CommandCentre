import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
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
    const user: any = {
      tokenType: 'Bearer',
      accessToken:
        'eyJraWQiOiJcL1N3QllienZ1bGlXcXRoWjk5NFdhNHc5Sm9aQlp0VXpVTGxJMGFNbUYyST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlYTA1ZWU0Ni0yMDc0LTQ3YzItOTEyMy1kYzg1NTIxNGNiNTEiLCJldmVudF9pZCI6IjRiMTM2YmE5LTEzODQtNDNiMi05YzE1LTU0YzYxZGNhZTVlMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NDgzNTM4NjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX2U3RTRFUG5SWCIsImV4cCI6MTY0ODM3MTg2MywiaWF0IjoxNjQ4MzUzODYzLCJqdGkiOiJmODM1NDM1OC1kYjgyLTQxYzMtYmZlYS1kN2Q0OGE4ZjAwYzIiLCJjbGllbnRfaWQiOiIxcGFwbDhlMW0xY3NndHRuN2kzZ2EzOHVsYiIsInVzZXJuYW1lIjoibWVodWxrb3RoYXJpMDVAZ21haWwuY29tIn0.cn3EsvNJ0-ISzQjDzTTigm8U_jVu-JXGA7tCwVG8Zp-As6Pq2NHXUpBxoJWaLPslt2u2549NGfUdAMEU4SNoYFxDGHck1gnOE7uSUSYBmm4oyv0yrlL6VuvuSHr7FeuXZUV-jC4jvUbvnSdzi0wOUaa97OEMKJZifJMxodH82yIYjWu_nsSPqGqkXJA8RNfY62SoWVgbLpk9-N2t4ugfxs_n0608dXuVrxFxG46LUXwgRWjupZgXGcSrgdtFUrMLkqSCbPuaMk84wqkOXsn6fbwyHhg1DUg-6o-U-6GbkcmEfbrcVtZ8CZDBJ6PhzSiIG7M_qd0aRh77VCZLg708Yw',
      expiresIn: 18000,
      idToken:
        'eyJraWQiOiJybHRsNnVmQTFGSEcra2Q4aGIxY2hDa2NLTkRjVGQ3OUg0bmFhb1lBS3p3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYTA1ZWU0Ni0yMDc0LTQ3YzItOTEyMy1kYzg1NTIxNGNiNTEiLCJjdXN0b206cm9sZXMiOiJBZG1pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9lN0U0RVBuUlgiLCJjb2duaXRvOnVzZXJuYW1lIjoibWVodWxrb3RoYXJpMDVAZ21haWwuY29tIiwiY3VzdG9tOmJ1c2luZXNzX2lkIjoiNzIzIiwiYXVkIjoiMXBhcGw4ZTFtMWNzZ3R0bjdpM2dhMzh1bGIiLCJldmVudF9pZCI6IjRiMTM2YmE5LTEzODQtNDNiMi05YzE1LTU0YzYxZGNhZTVlMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQ4MzUzODYzLCJuYW1lIjoiTWVodWwiLCJleHAiOjE2NDgzNzE4NjMsImlhdCI6MTY0ODM1Mzg2MywiZmFtaWx5X25hbWUiOiJLIiwiZW1haWwiOiJtZWh1bGtvdGhhcmkwNUBnbWFpbC5jb20ifQ.eNqQnnl-eLeh0S6qGDf-OlTLskA8EED9Zzs96KzUJak2TYEsPHRDjIbxzTNVcPESMzUpZpHtkKNo-6UkrLFDctgx8vu1RgFggM0bBTkgYo2UMZYz2YRINM91dJbbNm_D6n7R1oXAbL2QO9dXrJ3CQyAxo6XNwtQKRB4kLAv2Cl_fXCo1Cry6_sJg0um7YbAq06aFj6iBYLqtq4Cc0tEHx8UY-bV2JVp64P6xJE_fNer7phd7grlK1eOzRHG6t_cSKjezSDdtLpFBxMl_dxROWIAwY3y5vQ5ZEJ2poAfLubjjlcxudS3kZdCSjBDkTqInwEhrfaiDkk_Xz0KeAvXW7Q',
      refreshToken:
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.tTVNERdmudQfzv2B8dADkWGdWxkIKdkWqPnJ-yobuQ3_jnZrKvvVdiptFGzgi99yTF_KFzNrg1i-XwT1IrY4HO1vl0CpicSTL_BckNpgcEnyLO4Bltnjwa74ubQxn5qgA9sbipWNfGT3LgNGU7elGdqytfBW5kGfoRly_VrJKVTOD2fWzloSJrwELVrY88Y0BokTtsDV90hhQqgYpPGSUn3_OsY-p72WraJ5bH3yA4aTFu0gs9qJ7E5eH1Rx1kmoSZqBLScfzRjmDDn3CDT2WbQX_nwIdhlt8i7t7HNtlzmpVYp2zwRoAPHhifA3GJHwncQinsuTul2vN5QtsQlf6A.lrlniIQiMLNrP6_E.MI7TpW9oXw6Xz2m-Isg0rlXJ6fShCSlxBEZdR5oVq7_1xqsylhcHn-Qkfya-O7uB4fslaymGYGgf3pt8UiwuN6lLJ1Xpgk8qXSeOS753Ek_u6dJOUiBjdGzbDjnghGgjaymhixCsLIN3_aMCFTZx4CQh4gnqVWXPec_qJXMDfszV55V9Cp1iC1APjEBzHAZDDG1yPshHL6WYrESdOXLjkiZjN-MbJ_7uXTjE0DWClW4w7Pb5EMuv_KKvt8HVd3VcxvxhuEvddJfP6CcIwrK3cGk48GT2V9acVSNzxr1UYKpM4bk74eNeGz-pgSHUdmHHTrVFHXvlzFMUCnB3L4fdJ18sQjDAJjeLgRc7-3Wi4xug3K_xWu9BxN6TDUPvZQk3Ccmr46RFjA9gqfWd3fspXud6b25-KZLer7Y8uH0OCzl3J5adkRl_taqWNllyunm4W2Srdub8vJT_I0rQHfCsTvWYvycbNEclnA2Y32F6GENH8l8lA26vGIwZ0m6KcMqBmTQlZ4EBu7NUOfGRWN0-LRGI5UpqRgDF33fHthRB0svbVV_sTeEpIAzJl1KYWqkmaW7yceCj2FwUnzZX4haqK_ukseQfwNr4k7Ln9uVXm6O9fntUeLKvkDfQopHDiuUjH7FfRNl3oDoM8dMivJLr7G313M2oAftPDotCqWJh8L8K-dR_cOsKF0GkZdigEgv2B6Owo6388J8ukR3vM3Jj0H9fpSjXqYlg2sAgVID1dq0tYCURBqtUW49gTT2onPV1mtY855bbsp09-nNGdYeYwFWlejM5TT5uowYBQDJY8WrRVaIe3vVdqzs6Mrory63OhwGPhAWCEej8TpVVIRbw0ffqk2eEGdXJPHUsZxGR0LLQrk4gXGYCYgFdp7sz__qKrLmmt_njfSgq0HoSDsc6vrwR66M6mZOWRUdlM_h1eIta6lLRYnrhlMr8008u9yai6RqCHufxmkt30te8kEcNSHnWB8TWjMbGeXqLiUjjiY_fDfu2QpeiZLNVGxGxIFhmGaoh6xBjAEIyG9ngQGNamFGKQxr2T9bldTqUzuBU051swMINYGApdOUyNptOr4EMCYFWs9a-jyD_ylSdhMPuJRnjDbOOncbeGMywjjbKutt0sPasp-eGplsGqojj71jV8ObNOiaVlwY9OB7t9xu3EbkumLbpHrtZIYeqDtawCuz44DjFZu8GzZNBbeASSV5kxQ4TA4dG8yvwRvMnlp40ZU_nP8lyn1yYdRyinlhS_XC3t7Aab06BFxMiCwi6dPCJmTMnBP6duMIZ3Q9LLT-rq_Cnc_ycwMH862DJ.ZmPU1vkxdZT9Jw5osbrUUA',
      id: 2326,
      firstName: 'Mehul',
      lastName: 'K1',
      profileImageUrl: 'https://dev-emr-asset.s3.amazonaws.com/profile2326',
      designation: null,
      businessId: '723',
      roles: 'Admin',
      permissions: [],
      logoUrl: 'https://dev-emr-asset.s3.amazonaws.com/business723',
      supportUser: false
    };

    this.localStorageService.storeItem('currentUser', user);
    this.authService.currentUserSubject.next(user);
    this.redirect(user.roles);
    // from(this.authService.getUserByEmail(this.loginForm.value.email))
    //   .pipe(
    //     switchMap((userData: any): any => {
    //       if (userData) {
    //         this.businessId = userData.tenantId;
    //       } else {
    //         this.errMsg = 'Record for given Email Id is not found';
    //         return this.apiService.error(
    //           'Record for given Email Id is not found. Please contact our support team for further assistance.'
    //         );
    //       }
    //       if (this.businessId) {
    //         return from(this.authService.getBusinessData(this.businessId));
    //       }
    //       this.errMsg =
    //         'There is no business record found for ' +
    //         this.loginForm.value.email;
    //       return this.apiService.error(
    //         'There is no business record found for ' +
    //           this.loginForm.value.email +
    //           ' Please contact our support team for further assistance.'
    //       );
    //     })
    //     // catch(err => of([]));
    //   )
    //   .subscribe((businessData: any) => {
    //     if (!businessData.deleted) {
    //       this.userLoginAfterBusinessVerification(this.loginForm.value);
    //     }
    //   });
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
      this.router.navigate(['/leads']);
    }
  }

  toggleShowPasswordFeild() {
    this.isShowPassword = !this.isShowPassword;
  }
}
