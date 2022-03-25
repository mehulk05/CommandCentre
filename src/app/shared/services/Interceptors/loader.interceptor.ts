import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../api.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public apiService: ApiService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.apiService.startLoader();
    return next.handle(req).pipe(finalize(() => this.apiService.stopLoader()));
  }
}
