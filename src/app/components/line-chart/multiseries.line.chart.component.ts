<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
=======
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
>>>>>>> thao

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
		if (this.topicFilter.actionType == "GenerateReport"){
			this.getReportByTimeRange(this.topicFilter.startDateTime, this.topicFilter.endDateTime);
		  }
	}

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
		  if (this.topicFilter.actionType == "GenerateReport"){
			this.getReportByTimeRange(this.topicFilter.startDateTime, this.topicFilter.endDateTime);
		  }
		 
	}

	getReportByTimeRange(startDatetime: number, endDateTime: number): void {
		// this.reportService.getReportByTimeRange(1679361670714, 1689364671719)
		this.reportService.getReportByTimeRange(startDatetime, endDateTime)
		  .subscribe(data => {
			this.updateChart(data);
		  });
	}

	getTopics(): void {
		this.reportService.getTopics().subscribe(data => {
			this.topics = data;
			console.log(this.topics);
		});
	}

	loadTopics(): string[] {
		console.log(this.topics);
		return this.topics;
	}

	updateChart(reports: Report[]): void {
		this.chartModel = this.reportService.convertToChartModel(reports);
		this.chart.options.data = this.chartModel;
		this.chart.render();
	}
}
