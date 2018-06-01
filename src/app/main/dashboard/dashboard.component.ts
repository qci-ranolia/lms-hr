import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { HttpClient } from '@angular/common/http'
// import { NgxChartsModule } from '@swimlane/ngx-charts'
import * as moment from 'moment'
import { DialogComponent } from './dialog/dialog.component'
import { PieChartConfig } from '../../Models/PieChartConfig'
import { LmsService } from '../../services/lms.service'

// import { Ng4SpinnerService } from 'ng4-spinner'
declare var $ :any
declare var google :any
declare var Highcharts :any

@Component({
  selector :'app-dashboard',
  templateUrl :'./dashboard.component.html',
  styleUrls :['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'Reusable charts sample'

  getDate :number

  data1 :any[]
  config1 :PieChartConfig
  elementId1 :String

  data2 :any[]
  config2 :PieChartConfig
  elementId2 :String
  
  // Calendar
  public date = moment()
  postDate : any
  getMonth : any
  nxtMnth : any
  prvMnth : any
  public daysArr
  
  // data 
  employee = new Array
  // page loader
  loader :boolean = false

  constructor( public dialog : MatDialog, private lms : LmsService, private httpClient : HttpClient ) {
    //, private ngSpinner:Ng4SpinnerService
    var tmp = new Date()
    this.getDate = tmp.getDate()
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    this.lms.emitgetEmployees.subscribe( r => this.employee = Object.values(r) )
    //console.log(this.employee)
    $(function () { 
      var myChart = Highcharts.chart( 'container' , {
        chart : {
          type:'bar'
        },
        title : {
          text:'Employees'
        },
        xAxis : {
          categories:[ 'Male', 'Female', 'Other' ]
        },
        yAxis : {
          title:{
            text:'Consolidated'
          }
        },
        series : [
          { name:'Deep', data:[4, 0, 0] },
          { name:'Epak', data:[0, 4, 0] },
          { name:'Akran', data:[0, 0, 2] }
        ]
      })
    })
    /* $.getJSON('http://192.168.15.55:5000/lms/employeeDetails', function (d) {
      console.log(d)
      var myChart = Highcharts.chart('container', {
        chart:{
            type:'bar',
        },
        rangeSelector:{
          selected:1
        },
        title:{
          text:'Test'
        },
        series:[{
          name:'Test',
          data:d.data,
          tooltip:{
            valueDecimals:2
          }
        }]
      })
      // Create the chart
      /* Highcharts.stockChart('container',{
        rangeSelector:{
          selected:1
        },
        title:{
          text:'Test'
        },
        series:[{
          name:'Test',
          data:d.data,
          tooltip:{
              valueDecimals:2
          }
        }]
      }) */
   /* }) */
  }
  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width:'50%', height:'50%' })
  }
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
  postData(day){
    this.getMonth = this.date.format("MM/YYYY")
    let d = day
    if ( d < 10 ) {
      this.postDate = '0' + d
    } else this.postDate = d
    let temp = this.postDate+'/'+this.getMonth
    this.lms.postdata(temp)
  }
  public todayCheck( day ){
    if (!day){
      return false
    }
    return moment().format( "L" ) === day.format 
  }
  public createCalendar( month ) {
    let firstDay = moment( month ).startOf( "M" )
    let days = Array.apply( null, { length : month.daysInMonth() } )
      .map( Number.call, Number )
      .map ( ( n ) => {
        return moment( firstDay ).add( n, 'd' )
      })
      return days
  }
  public nextMonth() {
    this.date.add( 1, 'M' )
    
    this.daysArr = this.createCalendar( this.date )
    if ( !this.postDate ) this.getMonth = this.date.format( "DD/MM/YYYY" )
    else this.getMonth = this.date.format(this.postDate+'/'+"MM/YYYY" )
    console.log( this.getMonth )
  }
  public previousMonth() {
    this.date.subtract( 1, 'M' )
    
    this.daysArr = this.createCalendar( this.date )
    if ( !this.postDate ) this.getMonth = this.date.format( "DD/MM/YYYY" )
    else this.getMonth = this.date.format(this.postDate+'/'+"MM/YYYY" )
    console.log( this.getMonth )
  }
}
