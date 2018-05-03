import { Component, OnInit } from '@angular/core'
import { LmsService } from 'leave-management-system/src/app/lms.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  dates:any
  years:any
  months:any
  employees:any
  number:number
  constructor( private service:LmsService ){
    this.service.emitCalendar.subscribe( res => {
      this.dates = res[0].dates
      this.years = res[0].years
      this.months = res[0].months
      this.employees = res[0].employees
    })
  }

  ngOnInit() {
    this.service.get()
  }
  
  postDate(date){
    this.service.postDate(date)
  }

}
