import { Component, OnInit } from '@angular/core';

import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
var CanvasJS = CanvasJSAngularChart.CanvasJS;

import { ChartModel, Report } from './report';
import { ReportService } from './report.service';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  providers: [ReportService]
})
export class MultiseriesLineChartComponent implements OnInit {
	chart: any;
	chartModel: ChartModel[] = [];
	topics: string[] = [];

	constructor(private reportService: ReportService) {}

	ngOnInit() {
		this.getTopics();

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
	}

	getReportByTimeRange(): void {
		this.reportService.getReportByTimeRange(1679361670714, 1689364671719)
		  .subscribe(data => {
			this.updateChart(data);
		  });
	}

	getTopics(): void {
		let topics: string[] = [];
		this.reportService.getTopics().subscribe(data => {
			topics = data;
		});
	}

	updateChart(reports: Report[]): void {
		this.chartModel = this.reportService.convertToChartModel(reports);
		this.chart.options.data = this.chartModel;
		this.chart.render();
	}
}
