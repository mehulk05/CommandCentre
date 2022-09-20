import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-lead-table',
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.css']
})
export class LeadTableComponent implements OnInit, OnChanges {
  leadData: any;
  leadConfig: any = {
    itemsPerPage: 25,
    currentPage: 0
  };
  @Input() filter: any;

  constructor(private leadService: LeadServiceService) {}
  ngOnChanges(): void {
    console.log(this.filter);
    this.leadConfig = {
      itemsPerPage: 25,
      currentPage: 0
    };
    this.getLeadCount();
    this.loadLeads(this.leadConfig);
  }

  ngOnInit(): void {
    this.getLeadCount();
  }

  async getLeadCount() {
    const countObj = await this.leadService.getLeadCount(this.filter);
    console.log('countObj', countObj);
    this.leadConfig.totalItems = countObj?.count;
  }

  loadLeads(pageConfig: any) {
    console.log('lead clled');
    this.leadData = [];
    this.leadService
      .getLeads(this.filter, pageConfig.currentPage, pageConfig.itemsPerPage)
      .then(
        (data: any) => {
          this.leadData = data.results;
          console.log(data.results);
        },
        (e) => {
          console.log(e);
        }
      );
  }
  pageChangedForLead(event: any) {
    console.log(event);
    this.leadConfig.currentPage = event;
    const pageConfig: any = { ...this.leadConfig };
    pageConfig.currentPage = event - 1;
    console.log(pageConfig, this.leadConfig);
    this.loadLeads(pageConfig);
  }
}
