import { Component, OnInit } from '@angular/core'
import { LmsService } from 'leave-management-system/src/app/lms.service'
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  public date = moment()
  public daysArr
  
  // data:any
  employees:any
  //screen:any

  constructor(private service:LmsService){
    this.service.emitNames.subscribe( res => {
      this.employees = res
    })

    // this.service.emitCalendar.subscribe( res => {
    //   this.data = res[0].data
    // })
  
    // this.service.emitfd.subscribe(res=>{
    //   console.log(res)
    // })
              //   var DateHelper = {
              //     addDays:function(aDate,numberOfDays){
              //       aDate.setDate(aDate.getDate() + numberOfDays)   // Add numberOfDays
              //       return aDate                                    // Return the date
              //     },
              //     format:function format(date){
              //       return [
              //           ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
              //           ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
              //           date.getFullYear()                          // Get full year
              //       ].join('/');                                    // Glue the pieces together
              //     }
              //   }
              // this.screen = DateHelper.format( DateHelper.addDays( new Date(), 20 ) );
              // console.log(this.screen)
  
  }
  public ngOnInit(){
    this.daysArr = this.createCalendar( this.date )
    
    //this.service.get()
  }
  public todayCheck(day){
    if(!day){
      return false
    }
    return moment().format("L") === day.format 
  } public createCalendar(month){
    let firstDay = moment(month).startOf("M")
    let days = Array.apply( null, { length:month.daysInMonth() } )//+1
      .map( Number.call, Number )
      //.slice(1)
      .map ( (n) => {
        return moment(firstDay).add(n,'d')
      })
      
      // for ( let n= 0; n < firstDay.weekday(); n++ ){
      //   days.unshift(null)
      // }
      
      //console.log(days)
      return days
  } public postData(data){
    // console.log(data)
    this.service.postData(data)
  } public nextMonth(){
      this.date.add(1,'M')
      this.daysArr = this.createCalendar(this.date)
  } public previousMonth(){
      this.date.subtract(1,'M')
      this.daysArr = this.createCalendar(this.date)
  }
}
