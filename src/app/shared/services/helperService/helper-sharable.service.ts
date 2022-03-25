import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpHelperService } from '../HttpHelperService';

@Injectable({
  providedIn: 'root'
})
export class HelperSharableService {
  constructor(
    private apiService: ApiService,
    private httpHelperService: HttpHelperService
  ) {}

  getDefaultCinic() {
    const apiUrl = '/api/clinics/default';
    return this.apiService.get(
      apiUrl,
      '',
      false,
      this.httpHelperService.getTenantHttpOptions()
    );
  }
}
