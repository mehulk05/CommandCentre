import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit, OnChanges {
  appointmentConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 10
  };
  @Input() filter: any;
  appointments: any;

  constructor(private leadService: LeadServiceService) {}

  ngOnInit(): void {
    console.log('here');
  }

  ngOnChanges(): void {
    this.getAppoinments();
  }

  getAppoinments() {
    console.log('appt clled');
    this.leadService.getAppointments(this.filter).then(
      (data: any) => {
        this.appointments = data.results;
        this.appointmentConfig.totalItems = this.appointments.length;
        console.log(data.result);
      },
      (e: any) => {
        console.log(e);
      }
    );
  }

  pageChangedForAppointment(event: any) {
    this.appointmentConfig.currentPage = event;
  }
}
