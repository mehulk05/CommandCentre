import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.css']
})
export class AuthErrorComponent {
  @Input() error: any;
  @Input() success: any;
  constructor() {
    //
  }
}
