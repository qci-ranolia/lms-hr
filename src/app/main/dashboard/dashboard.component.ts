import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { HttpClient } from '@angular/common/http'
import * as moment from 'moment'
import { DialogComponent } from './dialog/dialog.component'
import { PieChartConfig } from '../../Models/PieChartConfig'
import { LmsService } from '../../services/lms.service'
// import { PipeTransform, Pipe } from '@angular/core'
// import { Ng4SpinnerService } from 'ng4-spinner'

declare var $ : any
declare var google : any
declare var Highcharts : any

@Component({
  selector : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : [ './dashboard.component.scss' ]
})
// @Pipe({name:'keys'})
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
  postDate : any
  getMonth : any
  nxtMnth : any
  prvMnth : any
  
  public daysArr
  applications = new Array()
  employee = new Array()
  holiday : any
  holday : any
  
  // page loader
  loader : boolean = false

  constructor(
    public dialog : MatDialog,
    private lms : LmsService,
    private httpClient : HttpClient
  ) {
    
    //, private ngSpinner:Ng4SpinnerService
    var tmp = new Date()
    this.getDate = tmp.getDate()
    
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    
    this.lms.emitgetEmployees.subscribe( r => this.employee = Object.values( r ) )
    this.lms.emitEOL.subscribe( r => this.applications = r )
    this.lms.emitgetHoliday.subscribe( el => {
      this.holiday = JSON.parse( el[0].data )
      this.holday = JSON.parse( el[1].data )
      // else console.log("1")
      // this.holiday = JSON.parse(el[0].data)
      // console.log( this.holiday )
    })
      
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
   /* })*/
  }/* 
  transform( value, args : string[] ) : any {
    console.log( value )
    console.log( args )
    let keys = []
    for ( let key in value ) {
      keys.push( { key : key, value : value[key] } )
    }console.log( keys )
    return keys
  } */

  // CSV Dialog 
  public openUploadDialog($e){
    $e.stopPropagation()
    let dialogRef = this.dialog.open( DialogComponent, { width:'50%', height:'50%' })
  }
  public ngOnInit() {
    // this.transform( this.holiday , this.employee )
    // Google chart 1
    this.data1 = [
      [ 'Task', 'Hours per Day' ],
      [ 'ZED', 3 ],
      [ 'NBQP', 2 ],
      [ 'NABET', 5 ],
      [ 'NABH', 4 ],
      [ 'NABCB', 10 ]
    ]

    this.config1 = new PieChartConfig( 'Board Section 1' , 0.4 )
    this.elementId1 = 'myPieChart1'
    // Google chart 2
    // Piechart2 Data & Config
    this.data2 = [
      [ 'Task', 'Hours per Day' ],
      [ 'QZED', 21 ],
      [ 'NBQP', 2 ],
      [ 'NABET', 2 ],
      [ 'NABH', 2 ],
      [ 'NABCB', 7 ]
    ]
    this.config2 = new PieChartConfig( 'Board Section 2', 0.4 )
    this.elementId2 = 'myPieChart2' 
    this.lms.getEmployees()
    this.lms.getEOL()  
    this.daysArr = this.createCalendar( this.date )
    this.lms.getHoliday()
    // this.ngSpinner.hide()
  }

  postEOLBSDate( day ){
    this.getMonth = this.date.format( "MM/YYYY" )
    let d = day
    if ( d < 10 ) {
      this.postDate = '0' + d
    } else this.postDate = d
    let temp = this.postDate+'/'+this.getMonth
    this.lms.postEOLBSDate( temp )
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
        // console.log( n )
        return moment( firstDay ).add( n, 'd' )
      })
      return days
  }

  public nextMonth() {
    this.date.add(1,'M')
    this.cmnProgram()
  }

  public previousMonth() {
    this.date.subtract(1,'M')
    this.cmnProgram()
  }

  cmnProgram(){
    this.daysArr = this.createCalendar( this.date )
    if ( !this.postDate ) this.getMonth = this.date.format( "DD/MM/YYYY" )
    else this.getMonth = this.date.format( this.postDate+'/'+"MM/YYYY" )
  }
}
