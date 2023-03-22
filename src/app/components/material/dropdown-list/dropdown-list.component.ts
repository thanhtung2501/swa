import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TopicFilter } from 'src/app/model/topicFilter';
import { ReportService } from './../../line-chart/report.service';

@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  providers: [ReportService]
})
export class DropdownListComponent implements OnInit {
  topics: string[] = [];

  @Output()
  getTopicName: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.getTopics();
  }

  constructor(private reportService: ReportService) {
  }

  getTopics(): void {
    this.reportService.getTopics().subscribe(data => {
      this.topics = data;
    });
  }

  getTopicChange(event: any) {
    this.getTopicName.emit(event.value);
  }

}
