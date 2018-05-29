import { Component, OnInit, ViewChild } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { PieChartConfig } from '../../Models/PieChartConfig'
import { HttpClient } from '@angular/common/http'
// import { NgxChartsModule } from '@swimlane/ngx-charts'
import * as moment from 'moment'
// import { Options } from 'selenium-webdriver/edge';
// import { MatDialogRef } from '@angular/material';
// // import { Ng4SpinnerService } from 'ng4-spinner'
// import { forkJoin } from 'rxjs/observable/forkJoin';

declare var google : any

@Component({
  selector : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'Reusable charts sample'

  getDate : number

  data1 : any[]
  config1 : PieChartConfig
  elementId1 : String

  data2 : any[]
  config2 : PieChartConfig
  elementId2 : String
  
  // Calendar
  public date = moment()
  public daysArr
  
  // data 
  employee = new Array

  // page loader
  loader : boolean = false

  /* file : File = null
  uploadUrl : 'http://192.168.15.55:5000/lms/holiday' */

  //.......State Variables
  // progress;
  // canBeClosed = true 
  // primaryButtonText = 'Upload'
  // showCancelButton = true 
  // uploading = false
  // uploadSuccessful = false

  // @ViewChild('file') file
  // public files: Set<File> = new Set()

  constructor( private lms : LmsService, private httpClient : HttpClient ) {
    //, private ngSpinner:Ng4SpinnerService
    //  private dialogRef:MatDialogRef<DashboardComponent>
    var tmp = new Date()
    this.getDate = tmp.getDate()
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    this.lms.emitgetEmployees.subscribe( r => this.employee = Object.values(r) )

  }

  // addFiles() {
  //   this.file.nativeElement.click()
  // }
  // onFilesAdded() {
  //   const files: { [key: string]: File } = this.file.nativeElement.files
  //   console.log(files)
  //   for (let key in files) {
  //     if ( !isNaN(parseInt(key) )) {
  //       this.files.add(files[key])
  //       console.log(key)
  //     }
  //   }
  // }
  

  /* closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close()
    }
    // set the component state to "uploading"
    this.uploading = true
    // start the upload and save the progress map
    this.progress = this.lms.upload(this.files)  
    // convert the progress map into an array
    let allProgressObservables = []
    for ( let key in this.progress ) {
      allProgressObservables.push( this.progress[key].progress )
    }
    // Adjust the state variables
    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish'
    // The dialog should not be closed while uploading
    this.canBeClosed = false
    this.dialogRef.disableClose = true
    // Hide the cancel-button
    this.showCancelButton = false
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe( end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true
      this.dialogRef.disableClose = false
      // ... the upload was successful...
      this.uploadSuccessful = true
      // ... and the component is no longer uploading
      this.uploading = false
    })
  } */

  /* onFileSelected( event ) {
      this.file = <File>event.target.files[0]
  }
  onUpload() {
    //this.uploadFileToUrl( this.file, this.uploadUrl )
    var fd = new FormData()
    fd.append('csv', this.file, this.file.name)
    var options = { content: fd }
    console.log(options)
    this.lms.postHoliday(options)
    console.log(fd)
  } */


  /* uploadFileToUrl(file, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);
      this.httpClient.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      })
      .success(function(){
      })
      .error(function(){
      })
  } */

  public ngOnInit() {
    
    this.data1 = [
      ['Task', 'Hours per Day'],
      ['ZED', 3],
      ['NBQP', 2],
      ['NABET', 5],
      ['NABH', 4],
      ['NABCB', 10]
    ]

    this.config1 = new PieChartConfig( 'Board Section 1', 0.4 )
    this.elementId1 = 'myPieChart1'

    //Piechart2 Data & Config
    this.data2 = [
      ['Task', 'Hours per Day'],
      ['QZED', 21],
      ['NBQP', 2],
      ['NABET', 2],
      ['NABH', 2],
      ['NABCB', 7]
    ]

    this.config2 = new PieChartConfig( 'Board Section 2', 0.4 )
    this.elementId2 = 'myPieChart2'

    this.lms.getEmployees()
    this.daysArr = this.createCalendar( this.date )
    // this.ngSpinner.hide()
  }
  
  public todayCheck( day ){
    if (!day){
      return false
    }
    return moment().format( "L" ) === day.format 
  }

  public createCalendar( month ) {
    let firstDay = moment(month).startOf( "M" )
    let days = Array.apply( null, { length: month.daysInMonth() } )
      .map( Number.call, Number )
      .map ( (n) => {
        return moment(firstDay).add( n, 'd' )
      })
      return days
  }

  public nextMonth() {
    this.date.add( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }

  public previousMonth() {
    this.date.subtract( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }

}
