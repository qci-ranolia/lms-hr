import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule }   from '@angular/forms'
import { HttpModule, Http } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { NavComponent } from './nav/nav.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CrudComponent } from './crud/crud.component'
import { EolComponent } from './eol/eol.component'
import { NewappComponent } from './newapp/newapp.component'
import { AppRoutingModule } from './/app-routing.module'
import { LoginComponent } from './login/login.component'
import { StatComponent } from './stat/stat.component';
import { AddEmpComponent } from './crud/add-emp/add-emp.component';
import { EditEmpComponent } from './crud/edit-emp/edit-emp.component';

import { ApiService } from './api.service';
import { LmsService } from './lms.service'
import { AuthService } from './auth.service'
import { GoogleChartsBaseService } from './google-charts.base.service';
import { GoogleComboChartService } from './google-combo-chart.service'
import { GooglePieChartService } from './google-pie-chart.service'

import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { Ng4SpinnerModule } from 'ng4-spinner';
import { PiechartComponent } from './dashboard/piechart/piechart.component';
// import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations:[
    AppComponent,
    NavComponent,
    DashboardComponent,
    CrudComponent,
    EolComponent,
    NewappComponent,
    LoginComponent,
    StatComponent,
    AddEmpComponent,
    EditEmpComponent,
    PiechartComponent,
  ],
  imports:[
    BrowserModule,
    FormsModule,
    // NgxChartsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
    MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    Ng4SpinnerModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent }
    ])
    ],
  providers: [ LmsService, ApiService, AuthService, GooglePieChartService, GoogleComboChartService, GoogleChartsBaseService ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}