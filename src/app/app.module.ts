import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientXsrfModule } from '@angular/common/http';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { MultiseriesLineChartComponent } from './components/line-chart/multiseries.line.chart.component';
import {ReportFilter} from './components/filter-section/reportFilter.component';
import { DatepickerComponent } from './components/material/datepicker/datepicker.component';
import { MaterialExampleModule } from './components/material/datepicker/material.module';
import { FilterNChartComponent } from './components/filter-n-chart/filter-n-chart.component';
import { DropdownListComponent } from './components/material/dropdown-list/dropdown-list.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'My-Xsrf-Cookie',
    //   headerName: 'My-Xsrf-Header',
    // }),
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: '', component: MultiseriesLineChartComponent },
    ]),
    MaterialExampleModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    CanvasJSChart,
    MultiseriesLineChartComponent,
    ReportFilter,
    DatepickerComponent,
    MessagesComponent,
    FilterNChartComponent,
    DropdownListComponent
  ],
  providers: [
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/