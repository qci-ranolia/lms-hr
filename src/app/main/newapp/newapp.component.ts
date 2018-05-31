import { Component, OnInit } from '@angular/core';
import { LmsService } from '../../services/lms.service';
import * as moment from 'moment'

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})

export class NewappComponent implements OnInit {
  loader : boolean = false
  application = new Array()

  constructor( private lms:LmsService ) {
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()

    this.lms.emitEOL.subscribe( el => {
      this.application = el 
      console.log( this.application )    
    })
  }

  ngOnInit(){
    this.lms.getEOL()
  }
    
  // countSundays(){
  //   // Calculate sundays between two days using Moment JS
  //   var f = moment( this.firstDate ),
  //   s = moment( this.secondDate ),
  //   sunday = 0 // Sunday
    
  //   let result = []
  //   var current = f.clone()
    
  //   while ( current.day(7 + sunday).isBefore(s) ) {
  //     result.push( current.clone() )
  //   }

  //   // Calculate leavedays
  //   let totalDays = s.diff(f, 'days')
  //   let sundayCount = result.map( m => m ).length
  //   this.leavedays =  1 + totalDays - sundayCount
  // }
  
  // df(){
  //   var dateStart = moment(this.firstDate)
  //   var dateEnd = moment(this.secondDate)
  //   var timeValues = []

  //   while ( dateEnd > dateStart ) {
  //     timeValues.push( dateStart.format( 'YYYY-MM-DD' ) )
  //     dateStart.add( 1,'day' )
  //   }
  //   console.log( timeValues )
  // }

  
  
}
