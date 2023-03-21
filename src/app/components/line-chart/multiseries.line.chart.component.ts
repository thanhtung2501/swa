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
	chartOptions = {};

	constructor(private reportService: ReportService) {}

	ngOnInit() {
		// this.getReports();
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

	getReports(): void {
		let reports: Report[] = [];
		this.reportService.getReport()
		  .subscribe(data => {
			reports = data;
			this.chartModel = this.reportService.convertToChartModel(reports);
			console.log(JSON.stringify(this.chartModel));
			let chartOptionsData = JSON.parse(JSON.stringify(this.chartModel));
			this.chart.options.data = chartOptionsData;
			this.chart.render();
		  });
	}
}
