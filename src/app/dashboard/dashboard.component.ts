import { Component, OnInit } from '@angular/core'
import { LmsService } from '../lms.service'
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  public date = moment()
  public daysArr
  
  employees:any
  
  constructor( private lms: LmsService ) { }
  
  public ngOnInit() {
    this.daysArr = this.createCalendar( this.date )
  }
  
  public todayCheck(day){
    if ( !day ) {
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
    this.date.add(1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }

  public previousMonth() {
    this.date.subtract( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }
  
}
