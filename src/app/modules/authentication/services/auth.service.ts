import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpHelperService } from 'src/app/shared/services/HttpHelperService';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private apiService: ApiService,
    private httpHelperService: HttpHelperService,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject.next(
      this.localStorageService.readStorage('currentUser')
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  getUserByEmail(email: string) {
    const apiUrl = '/api/public/users/byemail?email=' + email;
    return this.apiService.get(apiUrl);
  }

  getBusinessData(bid: string) {
    const apiUrl = '/api/public/v1/businesses/' + bid;
    return this.apiService.get(
      apiUrl,
      '',
      false,
      this.httpHelperService.getTenantHttpOptions
    );
  }

  loginByEmailAndPass(loginFormData: any) {
    const url = '/api/auth';
    return this.apiService.post(url, loginFormData);
  }

  /* -------------------------- Registeration method -------------------------- */
  registerAccount(registrationForm: any) {
    {
      const url = '/api/account/register';
      return this.apiService.post(url, registrationForm);
    }
  }
}
