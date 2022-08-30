import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-lead-table',
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.css']
})
export class LeadTableComponent implements OnInit, OnChanges {
  leadData: any;
  // @Input() set filter(value: any) {
  //   this.filter = value;
  // }
  @Input() filter: any;
  leadConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 10
  };
  constructor(private leadService: LeadServiceService) {}
  ngOnChanges(): void {
    console.log(this.filter);
    this.loadLeads();
  }

  ngOnInit(): void {
    console.log('here');
    console.log('received data', this.filter);
  }

  loadLeads() {
    console.log('lead clled');
    this.leadService.getLeads(this.filter).then(
      (data: any) => {
        this.leadData = data.results;
        this.leadConfig.totalItems = data.results.length;
        console.log(data.results);
      },
      (e) => {
        console.log(e);
      }
    );
  }
  pageChangedForLead(event: any) {
    this.leadConfig.currentPage = event;
  }
}
