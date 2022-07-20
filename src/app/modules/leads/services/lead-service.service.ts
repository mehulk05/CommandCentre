import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {
  constructor(private apiService: ApiService) {}

  getCampaignList() {
    return this.apiService.get('/v1/api/leads/campaigns', '', false);
  }

  getLeads() {
    return this.apiService.get('/v1/api/leads', '', false);
  }

  getCampaignListByFilter(filterObj: any) {
    return this.apiService.get('/v1/api/leads', '', false, {}, filterObj);
  }

  getAppointments(filterObj: any) {
    return this.apiService.get(
      '/v1/api/appointments',
      '',
      false,
      {},
      filterObj
    );
  }

  getCampaignAggregation(filterObj: any) {
    return this.apiService.get(
      '/v1/api/leads/campaigns/agg',
      '',
      false,
      {},
      filterObj
    );
  }
}
