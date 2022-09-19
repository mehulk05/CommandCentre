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

  getLeads(filterObj: any, page: number = 0, size: number) {
    filterObj = this.handleEmptyFeilds(filterObj);
    return this.apiService.get(
      '/v1/api/leads?page=' + page + '&size=' + size,
      '',
      false,
      {},
      filterObj
    );
  }

  getLeadCount(filterObj: any): any {
    return this.apiService.get('/v1/api/leads/count', '', false, {}, filterObj);
  }

  getAppointmentCount(filterObj: any): any {
    return this.apiService.get('/v1/api/appointments/count', '', false, {}, filterObj);
  }

  getLeadCampaignCount(filterObj: any): any {
    return this.apiService.get('/v1/api/leads/campaigns/agg/count', '', false, {}, filterObj);
  }

  getCampaignListByFilter(filterObj: any) {
    filterObj = this.handleEmptyFeilds(filterObj);
    return this.apiService.get('/v1/api/leads', '', false, {}, filterObj);
  }

  getAppointments(filterObj: any, page: number = 0, size: number) {
    filterObj = this.handleEmptyFeilds(filterObj);
    return this.apiService.get(
      '/v1/api/appointments?page=' + page + '&size=' + size,
      '',
      false,
      {},
      filterObj
    );
  }

  getCampaignAggregation(filterObj: any, page: number = 0, size: number) {
    filterObj = this.handleEmptyFeilds(filterObj);
    return this.apiService.get(
      '/v1/api/leads/campaigns/agg?page=' + page + '&size=' + size,
      '',
      false,
      {},
      filterObj
    );
  }

  handleEmptyFeilds(params: any) {
    const updatedParams: any = {};
    if (params.campaignName) {
      updatedParams['campaignName'] = params.campaignName;
    }

    if (params.startDate && params.endDate) {
      updatedParams['startDate'] = params.startDate;
      updatedParams['endDate'] = params.endDate;
    }

    return updatedParams;
  }
}
