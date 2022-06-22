import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {
  constructor(private apiService: ApiService) {}

  getCampaignList() {
    return this.apiService.get('/api/list-campaign', '', false);
  }

  getLeads() {
    return this.apiService.get('/api/leads', '', false);
  }

  getCampaignListByFilter(filterObj: any) {
    return this.apiService.post('/api/leadsFilter?', filterObj, '', false);
  }
}
