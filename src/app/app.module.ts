import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule }   from '@angular/forms'
import { HttpModule, Http } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { NavComponent } from './main/nav/nav.component'
import { DashboardComponent } from './main/dashboard/dashboard.component'
import { CrudComponent } from './main/crud/crud.component'
import { EolComponent } from './main/eol/eol.component'
import { NewappComponent } from './main/newapp/newapp.component'
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './login/login.component'
import { StatComponent } from './stat/stat.component';
import { AddEmpComponent } from './main/crud/add-emp/add-emp.component';
import { EditEmpComponent } from './main/crud/edit-emp/edit-emp.component';

import { ApiService } from './services/api.service';
import { LmsService } from './services/lms.service'
import { AuthService } from './services/auth.service'
import { GoogleChartsBaseService } from './services/google-charts.base.service';
import { GoogleComboChartService } from './services/google-combo-chart.service'
import { GooglePieChartService } from './services/google-pie-chart.service'

import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { Ng4SpinnerModule } from 'ng4-spinner';
import { PiechartComponent } from './main/dashboard/piechart/piechart.component';
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