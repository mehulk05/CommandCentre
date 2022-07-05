import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {
  constructor(private apiService: ApiService) {}

  getCampaignList() {
    return this.apiService.get('/api/leads/campaigns', '', false);
  }

  getLeads() {
    return this.apiService.get('/api/leads', '', false);
  }

  getCampaignListByFilter(filterObj: any) {
    return this.apiService.get(
      '/api/leads/leadsFilter',
      '',
      false,
      {},
      filterObj
    );
  }

  getAppointments() {
    return this.apiService.get('/api/appointments', '', false);
  }

  getCampaignAggregation() {
    return this.apiService.get('/api/leads/campaigns/agg', '', false);
  }
}
