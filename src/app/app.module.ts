import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule }   from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { NavComponent } from './nav/nav.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CrudComponent } from './crud/crud.component'
import { EolComponent } from './eol/eol.component'
import { NewappComponent } from './newapp/newapp.component'
import { LmsService } from './lms.service'
import { AppRoutingModule } from './/app-routing.module'
import { LoginComponent } from './login/login.component'
import { EditprofileComponent } from './editprofile/editprofile.component'



import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { StatComponent } from './stat/stat.component';
import { ApiService } from './api.service';

@NgModule({
  declarations:[
    AppComponent,
    NavComponent,
    DashboardComponent,
    CrudComponent,
    EolComponent,
    NewappComponent,
    LoginComponent,
    EditprofileComponent,
    StatComponent,
  ],
  imports:[
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
    MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule
    ],
  providers:[ LmsService, ApiService ],
  bootstrap:[
    AppComponent
  ]
})

export class AppModule {}