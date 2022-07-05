import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-campaignleads',
  templateUrl: './campaignleads.component.html',
  styleUrls: ['./campaignleads.component.css']
})
export class CampaignleadsComponent implements OnInit {
  leadData: any = [];
  campaignName: string = '';
  constructor(
    private leadService: LeadServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params); // { order: "popular" }
      this.campaignName = params['campaignName'];
    });
  }

  ngOnInit(): void {
    this.getLeadsByCampaign();
  }

  getLeadsByCampaign() {
    console.log(this.campaignName);
    const filterObj = {
      campaignName: this.campaignName,
      startDate: '',
      endDate: ''
    };
    this.leadService.getCampaignListByFilter(filterObj).then(
      (data: any) => {
        this.leadData = data.results;
        console.log(this.leadData);
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
