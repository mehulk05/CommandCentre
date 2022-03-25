import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ERROR_HANDLER_MESSAGE } from '../common/constants/constant';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private hostUrl = environment.SERVER_API_URL;
  constructor(
    public http: HttpClient,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    public localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  async getHeader(headerOptions: any, doNotSendAuthorizationParam: boolean) {
    const headerParams: any = {};
    const token: any = await this.localStorageService.readStorage('currentUser')
      ?.idToken;

    if (doNotSendAuthorizationParam !== true && token) {
      headerParams.Authorization = `Bearer ${token}`;
    }

    if (headerOptions) {
      Object.assign(headerParams, headerOptions);
    }

    const headers = new HttpHeaders(headerParams);

    // if (headerOptions['X-TenantID']) {
    //   headers = headers.append(
    //     'X-TenantID',
    //     headerOptions['X-TenantID'].toString()
    //   );
    // }
    return { headers };
  }

  post(
    url: string,
    body: any,
    errorMsg: any = '',
    doNotSendAuthorizationParam: boolean = false,
    headerOptions: any = {},
    loaderContinue?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(
        headerOptions,
        doNotSendAuthorizationParam
      );
      this.http
        .post(`${this.hostUrl}${url}`, body, options)
        .pipe(
          map((res) => {
            if (!loaderContinue) {
              this.stopLoader();
            }
            return res;
          })
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            this.handleError(errorMsg ?? err);
            reject(err);
          }
        );
    });
  }

  get(
    url: string,
    errorMsg: any = '',
    doNotSendAuthorizationParam: boolean = false,
    headerOptions: any = {},
    loaderContinue?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(
        headerOptions,
        doNotSendAuthorizationParam
      );
      this.http
        .get(`${this.hostUrl}${url}`, options)
        .pipe(
          map((res) => {
            if (!loaderContinue) {
              this.stopLoader();
            }
            return res;
          })
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            this.handleError(errorMsg ?? err);
            reject(err);
          }
        );
    });
  }

  put(
    url: any,
    body: any,
    errorMsg: any = '',
    headerOptions: any = {},
    doNotSendAuthorizationParam: boolean = false,
    loaderContinue?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(
        headerOptions,
        doNotSendAuthorizationParam
      );
      this.http
        .put(`${this.hostUrl}${url}`, body, options)
        .pipe(
          map((res) => {
            if (!loaderContinue) {
              this.stopLoader();
            }
            return res;
          })
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            this.handleError(errorMsg ?? err);
            reject(err);
          }
        );
    });
  }

  delete(
    url: any,
    errorMsg: any = '',
    doNotSendAuthorizationParam: boolean = false,
    headerOptions: any = {},
    loaderContinue?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(
        headerOptions,
        doNotSendAuthorizationParam
      );
      this.http
        .delete(`${this.hostUrl}${url}`, options)
        .pipe(
          map((res) => {
            if (!loaderContinue) {
              this.stopLoader();
            }
            return res;
          })
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            this.handleError(errorMsg ?? err);
            reject(err);
          }
        );
    });
  }

  getCsv(
    url: string,
    body: any,
    doNotSendAuthorizationParam: boolean = false,
    headerOptions: any = {},
    loaderContinue?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const options: any = await this.getHeader(
        headerOptions,
        doNotSendAuthorizationParam
      );
      options['responseType'] = 'text';
      this.http
        .get(`${this.hostUrl}${url}`, options)
        .toPromise()
        .then((res: any) => {
          if (!loaderContinue) {
            this.stopLoader();
          }
          resolve(res);
          const fileName = `${body.fileName}.csv`;
          const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.handleError(err);
          reject(err);
        });
    });
  }

  async handleError(err: any) {
    console.log(err);
    if (typeof err == 'string') {
      this.error(err);
    } else {
      if (err.status === 400) {
        this.error(err.error.error.message);
      } else if (err.status === 404) {
        this.error(err.error.error.message);
      } else if (err.status === 401) {
        this.error(err.error.error.message);
        this.localStorageService.clearDataFromIndexedDB();
        this.router.navigate(['/home-page']);
      } else if (err.status === 412) {
        this.error(err.error.error.message);
      } else if (err.status === 422) {
        this.error(err.error.error.message);
      } else if (err.status === 500) {
        this.error(ERROR_HANDLER_MESSAGE.INTERNAL_SERVER_ERROR);
      } else if (err.status === 0) {
        this.error(ERROR_HANDLER_MESSAGE.SERVER_ERROR_OR_NO_INTERNET);
      }
    }
  }

  error(message: string) {
    this.stopLoader();
    this.toastrService.error(message, 'Error', {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      timeOut: 3000
    });
  }

  startLoader() {
    this.ngxLoader.start();
  }

  stopLoader() {
    this.ngxLoader.stop();
  }
}
