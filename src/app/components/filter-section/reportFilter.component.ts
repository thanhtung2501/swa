import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'report-filter',
    templateUrl: 'reportFilter.component.html',
})
export class ReportFilter {
    startTime: string = "00:00 am";
    endTime: string = "00:00 am";
    choosedDate: Date = new Date();

    constructor(){}

    @Output()
    timeSet: EventEmitter<string> = new EventEmitter<string>();

    generateReport() {
        alert(this.startTime + "  " + this.endTime + "  " + this.choosedDate);
    }
    getStartTimeChanged(event: any){
        this.startTime = event;
    }
    getEndTimeChanged(event: any){
        this.endTime = event;
    }
    getDateChanged(event: any){
       this.choosedDate = event;
    }
}