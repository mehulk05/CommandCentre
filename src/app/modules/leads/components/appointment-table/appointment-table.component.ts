import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit, OnChanges {
  appointmentConfig: any = {
    itemsPerPage: 25,
    currentPage: 0,
    id: 1,
    totalItems: 0
  };
  @Input() filter: any;
  appointments: any;
  loadTable = false;
  constructor(private leadService: LeadServiceService) {}

  ngOnInit(): void {
    this.getAppointmentCount();
  }

  getAppointmentCount() {
    const countObj = this.leadService
      .getAppointmentCount(this.filter)
      .then((data: any) => {
        this.appointmentConfig.totalItems = data?.count;
      });
    console.log('countObj', countObj.count);
  }
  ngOnChanges(): void {
    this.getAppoinments(this.appointmentConfig);
  }

  getAppoinments(pageConfig: any) {
    console.log('appt clled', pageConfig);
    this.loadTable = true;
    this.appointments = [];
    this.leadService
      .getAppointments(
        this.filter,
        pageConfig.currentPage,
        pageConfig.itemsPerPage
      )
      .then(
        (data: any) => {
          this.loadTable = false;
          this.appointments = data.results;
          console.log(data.result);
        },
        (e: any) => {
          this.loadTable = false;
          console.log(e);
        }
      );
  }

  pageChangedForAppointment(event: any) {
    this.appointmentConfig.currentPage = event;
    const pageConfig: any = { ...this.appointmentConfig };
    pageConfig.currentPage = event - 1;
    console.log(pageConfig, this.appointmentConfig);
    this.getAppoinments(pageConfig);
  }
}
