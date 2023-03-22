import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
var CanvasJS = CanvasJSAngularChart.CanvasJS;

import { ChartModel, Report } from './report';
import { ReportService } from './report.service';
import { TopicFilter } from '../../model/topicFilter';

@Component({
	selector: 'app-chart',
	templateUrl: 'chart.component.html',
	providers: [ReportService]
})
export class MultiseriesLineChartComponent implements OnInit, OnChanges {
	chart: any;
	chartModel: ChartModel[] = [];
	topics: string[] = [];

	@Input()
	topicFilter: TopicFilter = {} as TopicFilter;

	constructor(private reportService: ReportService) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.topicFilter.actionType == "GenerateReport") {
			this.getReportByTimeRange(this.topicFilter.topicName, this.topicFilter.startDateTime, this.topicFilter.endDateTime);
		} else if (this.topicFilter.actionType == "DownloadCsv") {
			this.downloadCsv(this.topicFilter.topicName, this.topicFilter.startDateTime, this.topicFilter.endDateTime);
		}
	}

	ngOnInit() {
		this.chart = new CanvasJS.Chart("chartContainer", {
			theme: "light1", // "light2", "dark1", "dark2"
			title: {
				text: "Report Service"
			},
			data: [
				{
					type: "line", // Change type to "bar", "area", "spline", "pie",etc.
					dataPoints: []
				}
			]
		});
		this.chart.render();
		if (this.topicFilter.actionType == "GenerateReport") {
			this.getReportByTimeRange(this.topicFilter.topicName, this.topicFilter.startDateTime, this.topicFilter.endDateTime);
		}
	}

	downloadCsv(topicName: string, startDatetime: number, endDateTime: number): void {
		this.reportService
			.generateCsv(topicName, startDatetime, endDateTime)
			.subscribe(res => {
				const downloadLink = document.createElement('a');

				const data: Blob = new Blob([res], {
					type: "text/csv;charset=utf-8"
					// type: "application/ms-excel;charset=utf-8"
				});

				downloadLink.href = URL.createObjectURL(data);
				console.log(res);
				console.log(res.headers);
				console.log(res.type);

				const contentDisposition = res.headers.get('content-disposition');
				const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
				downloadLink.download = fileName;
				// downloadLink.download = 'report.csv';
				downloadLink.click();

				// let downloadURL = window.URL.createObjectURL(data);
				// let link = document.createElement('a');
				// link.href = downloadURL;
				// link.download = "report.csv";
				// link.click();
			});
	}

	getReportByTimeRange(topicName: string, startDatetime: number, endDateTime: number): void {
		this.reportService.getReportByTimeRange(topicName, startDatetime, endDateTime)
		  .subscribe(data => {
			if (data.length > 0){
				this.updateChart(data);
			}
		  });
	}

	updateChart(reports: Report[]): void {
		this.chartModel = this.reportService.convertToChartModel(reports);
		this.chart.options.data = this.chartModel;
		this.chart.render();
	}
}
