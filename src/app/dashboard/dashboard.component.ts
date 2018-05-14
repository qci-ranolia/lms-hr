import { Component, OnInit } from '@angular/core'
import { LmsService } from '../lms.service'
import * as moment from 'moment'
// import { Ng4SpinnerService } from 'ng4-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  public date = moment()
  public daysArr
  
  employees:any
  loader : boolean = false

  constructor( private lms: LmsService ){ //, private ngSpinner:Ng4SpinnerService
    // this.ngSpinner.show()
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
  }
  public ngOnInit() {
    this.daysArr = this.createCalendar( this.date )
    // this.ngSpinner.hide()
  }
  public todayCheck(day){
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
    this.date.add(1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }
  public previousMonth() {
    this.date.subtract( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }
}
