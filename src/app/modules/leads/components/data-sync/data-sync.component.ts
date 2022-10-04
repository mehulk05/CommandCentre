import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-data-sync',
  templateUrl: './data-sync.component.html',
  styleUrls: ['./data-sync.component.css']
})
export class DataSyncComponent {
  constructor(
    private leadService: LeadServiceService,
    private toastrService: ToastrService
  ) {}

  getAppointmentData() {
    if (
      confirm('Are you sure you want to trigger historical appointment store?')
    ) {
      this.leadService.callAppointmentHistorical().then(
        (data: any) => {
          console.log(data);
          this.toastrService.show(
            'Appointment update has been triggered successfully and will take while to update the data'
          );
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }
}
