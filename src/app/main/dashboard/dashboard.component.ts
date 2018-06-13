import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { HttpClient } from '@angular/common/http'
import * as moment from 'moment'
import { DialogComponent } from './dialog/dialog.component'
import { PieChartConfig } from '../../Models/PieChartConfig'
import { LmsService } from '../../services/lms.service'

declare var $ : any
declare var google : any
declare var Highcharts : any

@Component({
  selector : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : [ './dashboard.component.scss' ]
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
  postDate : any
  getMonth : any
  nxtMnth : any
  prvMnth : any
  
  public daysArr
  applications = new Array()
  employee = new Array()
  items = new Array()
  restricted : any
  compulsory : any
  holidays : any
  workingDays : any
  offDays : any = []
  // page loader
  loader : boolean = false
  hide : boolean = false

  constructor( public dialog : MatDialog, private lms : LmsService, private httpClient : HttpClient ) {
    var tmp = new Date()
    this.getDate = tmp.getDate()
    
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    
    this.lms.emitgetEmployees.subscribe( r => this.employee = Object.values(r) )
    this.lms.emitEOL.subscribe( r => this.applications = r )
    this.lms.emitgetHoliday.subscribe( el => {
      this.restricted = JSON.parse( el[0].data )
      this.restricted.map( ans => ans.type = "one" )
      this.compulsory = JSON.parse( el[1].data )
      this.compulsory.map( ans => ans.type = "two" )
      this.holidays = this.restricted.concat(this.compulsory).sort(function(a,b){
        a = a.Dates.split('/').reverse().join('')
        b = b.Dates.split('/').reverse().join('')
        return a > b ? 1 : a < b ? -1 : 0
      })
    })
      
    $(function() { 
      var myChart = Highcharts.chart('container',{
        chart : {
          type :'bar'
        },
        title : {
          text :'Employees'
        },
        xAxis : {
          categories : [ 'Male', 'Female', 'Other' ]
        },
        yAxis : {
          title : {
            text : 'Consolidated'
          }
        },
        series : [
          { name : 'Deep', data : [4, 0, 0] },
          { name : 'Epak', data : [0, 4, 0] },
          { name : 'Akran', data : [0, 0, 2] }
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
  }
  // CSV Dialog 
  public openUploadDialog( $e ){
    $e.stopPropagation()
    let dialogRef = this.dialog.open( DialogComponent, { width:'50%', height:'50%' })
  }
  public ngOnInit() {
    // $(window).focus(function() {
    //   alert("1")
    // })
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
    // Order does not matter here after console.log( new Date().getTime() )
    this.lms.getHoliday()
    this.lms.getEmployees()
    this.lms.getEOL()
    // this.restricted = JSON.parse( this.restricted )
    this.daysArr = this.createCalendar( this.date )
    // this.ngSpinner.hide()
  }
  postEOLBSDate( day ){
    this.getMonth = this.date.format( "MM/YYYY" )
    this.postDate = day
    let temp = this.postDate+'/'+this.getMonth
    // this.lms.getHoliday()
  }
  public todayCheck( day ){
    if ( !day ){
      return false
    }
    return moment().format( "L" ) === day.format 
  }
  
  
  
  
  public createCalendar( month ){
    let f = moment(month).startOf("M"),
    s = moment(f).endOf('month'),
    sunday = 0,
    r = [],
    c = f.clone(),
    h = [],
    z = [],
    y : number,
    m : number,
    temp = [],
    dates = []    
    //find sundays in a month
    while( c.day( 7 + sunday ).isBefore(s)) r.push(c.clone().format("DD/MM/YYYY"))
    // Calculate leavedays
    let td : number = s.diff( f, 'days' ) + 1
    // let leavedays : number = td - r.length
    // Get dates between current month
    // push all dates in an array
    while( f < s ){
      temp.push( f.format( 'DD/MM/YYYY' ) )
      f.add( 1, 'day' )
    }
    // exclude working days and sundays from current month 
    setTimeout(() => {
      // map CSV holiday and push in an empty array
      this.compulsory.map( e => h.push( e["Dates"] ) )
      // combine two arrays and sort them accordingly
      var x = h.concat( r ).sort( function( a, b ){
        a = a.split('/').reverse().join('')
        b = b.split('/').reverse().join('')
        return a > b ? 1 : a < b ? -1 : 0
      })
      // filter total working days in a given month
      this.workingDays = temp.filter( k => {
        // Find total holidays in "DD" format for styling
        if( x.indexOf(k) >= 0 ){
          y = k.split('/').reverse().join('').slice(-2)
          z.push(y)
        }
        return x.indexOf( k ) < 0
      })
      this.lms.postEOLBSDate(this.workingDays)
      // Add some ~ delay so that .subscribe() method fetch holidays from the api in given time
      // To add exact delays find epoch values of constructor, NGONINT & subscribe method
    }, 400 )
    // Create a calendar for whole month which includes sundays & holidays
    let days = Array.apply( null, { length : month.daysInMonth() })
    .map( Number.call, Number )
    .map( ( n ) => {
      return moment(f).add(n,'d').format("DD")
    })
    // setTimeout is set to get 'z' value after some delay and find all off days in a given month
    setTimeout(() => {
      days.map( n => {
        if( z.indexOf( n ) >= 0 ) this.offDays.push(n)
      })
      // console.log(this.offDays)
    }, 400 )
    // console.log( days )
    return days
  }

  // $('.main h3').attr('id','myd_1')
  // (function() {
  //   var fixed = $('.navbar')
  //   $(window).on('scroll',function() {
  //     var currentFixedDivPosition = fixed.position().top + fixed.height() + $(window).scrollTop()
  //     var temp, whichOne
  //     $('.mains h3').each( function (i,s) {
  //       var diff = Math.abs( $(s).position().top - currentFixedDivPosition)
  //       if (temp) {
  //         if( diff < temp ) {
  //           temp = diff
  //           whichOne = s
  //           var tct = $(whichOne).text()
  //           $('.left-menus').text(tct)
  //         }
  //       } else {
  //         temp = diff;
  //         whichOne = s;
  //         var tcta = $(whichOne).text();
  //         $('.left-menus').text(tcta);
  //       }
  //     })
  //     $('.mblView > .navbar-nav:visible').css('height','100vh')
  //   })
  // })()










  public nextMonth(){
    this.date.add( 1, 'M' )
    this.cmnProgram()
  }
  public previousMonth() {
    this.date.subtract( 1, 'M' )
    this.cmnProgram()
  }
  cmnProgram(){
    this.daysArr = this.createCalendar( this.date )
    if ( !this.postDate ) this.getMonth = this.date.format( "DD/MM/YYYY" )
    else this.getMonth = this.date.format( this.postDate+'/'+"MM/YYYY" )
  }

}
