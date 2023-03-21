import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Report } from './report';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  @Injectable()
  export class ReportService {
    reportUrl = 'http://10.200.29.115:8081/report/topic/NSI_1_2';
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ReportService');
    }

    getReport(): Observable<Report[]> {
        return this.http.get<Report[]>(this.reportUrl)
          .pipe(
            catchError(this.handleError('getReport', []))
          );
      }

  }