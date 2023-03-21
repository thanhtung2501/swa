import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Report, ReportObj, ChartModel, ChartDTO } from './report';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ReportService {
    dataUrl = 'assets/data.json';

    reportUrl = 'http://10.200.9.75:8081/report/time?from=1679361670714&to=1689364671719';
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

    convertToChartModel(reports: Report[]): ChartModel[] {
        let chartModelArr: ChartModel[] = [];

        for (let item of reports) {
            let dataPoints: ChartDTO[] = [];

            for (let dataItem of item.data) {
                let chartDTO: ChartDTO = {
                    x: dataItem.timestamp,
                    y: dataItem.value
                }

                dataPoints.push(chartDTO);
            }

            let chartModel: ChartModel = {
                type: "line",
                name: item.topicName,
                showInLegend: true,
                yValueFormatString: "#,###°F",
                dataPoints: dataPoints
            };

            chartModelArr.push(chartModel);
        }

        return chartModelArr;
    }

}