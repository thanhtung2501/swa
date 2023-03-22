import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'report-filter',
    templateUrl: 'reportFilter.component.html',
})
export class ReportFilter {
    startTime: string = "05:30 pm";
    endTime: string = "05:15 pm";

    constructor(){}

    @Output()
    timeSet: EventEmitter<string> = new EventEmitter<string>();

    generateReport() {
        alert(this.startTime + this.endTime);
        // alert(this.endTime);
    }
    getTimeChanged(event: any){
        console.log(event);
    }
    openTime(event: any){
        console.log(event);
    }
}