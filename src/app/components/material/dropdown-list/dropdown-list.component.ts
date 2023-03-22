import { Component, OnInit } from '@angular/core';
import { ReportService } from './../../line-chart/report.service';

@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  providers: [ReportService]
})
export class DropdownListComponent implements OnInit {
  topics: string[] = [];
  
  ngOnInit(): void {
    this.getTopics();
  }


  constructor(private reportService: ReportService) {
	}

  getTopics(): void {
		this.reportService.getTopics().subscribe(data => {
			this.topics = data;
			console.log(this.topics);
		});
	}

}
