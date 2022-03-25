import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHelperService } from './HttpHelperService';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private httpHelperService: HttpHelperService,
    private apiService: ApiService
  ) {}

  getMenus() {
    const apiUrl = '/api/menus';
    return this.apiService.get(apiUrl);
  }

  getUserMenus(userId: any, roleName: string) {
    const apiUrl = '/api/menus/user?roleName=' + roleName + '&userId=' + userId;
    return this.apiService.get(
      apiUrl,
      '',
      false,
      this.httpHelperService.getTenantHttpOptions()
    );
  }
}
