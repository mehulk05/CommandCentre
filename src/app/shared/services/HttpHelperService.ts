import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {
  businessId: number = 0;
  constructor(private localStorageService: LocalStorageService) {
    this.businessId =
      this.localStorageService.readStorage('currentUser')?.businessId;
  }

  getTenantHttpOptions(businessId?: any) {
    businessId = businessId ? businessId : this.businessId;
    const httpOptions = {
      'X-TenantID': '' + businessId
    };

    return httpOptions;
  }

  getTenantHttpOptionsinHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-TenantID', '' + this.businessId);

    const httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  getHttpOptionsForUpload() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return httpOptions;
  }
}
