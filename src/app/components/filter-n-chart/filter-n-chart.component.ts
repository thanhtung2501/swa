import { Component } from '@angular/core';
import { TopicFilter } from '../../model/topicFilter';

@Component({
  selector: 'filter-n-chart',
  templateUrl: './filter-n-chart.component.html',
  styleUrls: ['./filter-n-chart.component.css']
})
export class FilterNChartComponent {
  topicFilter: TopicFilter = {
    startDateTime: 0,
    endDateTime: 0,
    actionType: ""
  }


  getTopicFilterCondition(event: TopicFilter){
    this.topicFilter = event; 
    alert(this.topicFilter.startDateTime);
  }
}
