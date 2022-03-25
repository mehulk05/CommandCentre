import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasTMessageService {
  constructor(private toastrService: ToastrService) {}

  success(message: string, title?: string) {
    this.toastrService.success(message, title ?? 'Success', {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      timeOut: 3000
    });
  }

  error(message: string, title?: string) {
    this.toastrService.error(message, title ?? 'Error', {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      timeOut: 3000
    });
  }
}
