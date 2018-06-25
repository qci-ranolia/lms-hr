import { Component, OnInit } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import * as moment from 'moment'
import * as _ from "lodash"
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})

export class NewappComponent implements OnInit {
  hide : boolean = true
  restHide : boolean = true
  date : any
  loader : boolean = false
  toggle : boolean = false
  application = new Array()
  cmn : any
  approvedLeave : any
  cancelledLeave : any
  constructor( private lms : LmsService, public datepipe: DatePipe ) {
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    // if zero employee on leave
    this.lms.emitZeroEOL.subscribe( r => this.hide=false )
    // if pending leave
    this.lms.emitEOL.subscribe( el => {
      // console.log(el)
      this.cmn = el
      // console.log( new Date().getTime() )
      this.simplyfiData()
      this.application = this.cmn
      // console.log(this.application)
    })
    // if approved leave
    this.lms.emitApprovedApplication.subscribe( el =>{
      // console.log(el)
      this.cmn = el
      // console.log( new Date().getTime() )
      this.simplyfiData()
      this.approvedLeave = this.cmn
      // console.log(this.approvedLeave)
    })
    // if cancelled leave
    this.lms.emitCancelledApplication.subscribe( el =>{
      // console.log(el)
      this.cmn = el
      this.simplyfiData()
      this.cancelledLeave = this.cmn
      // console.log(this.cancelledLeave)
    })
  }
  ngOnInit(){
    this.lms.getEOL()
    this.lms.approvedLeave()
    this.lms.cancelledLeave()
  }
  // simplyfy Response from all http request
  simplyfiData(){
    // console.log(this.cmn)
    console.log(this.cmn.length)
    console.log(this.cmn)
    if( !(this.cmn.length > 0) ) this.restHide = false
    else {
      this.restHide = true
      // console.log( new Date().getTime() )
      for ( var i = 0; i < this.cmn.length; i++ ){
        this.cmn[i].info.map( r => {
          var t = Object.assign( this.cmn[i], r )
          delete this.cmn[i].info
        })
        console.log(this.cmn[i].application_id.length)
        
        /* for ( var j = 0; j < this.cmn[i].application_id.length; i++ ){
          console.log(j)
          // console.group
          this.cmn[i].application_id.map( r => {
            console.log(r)
            // var t = Object.assign( this.cmn[i],r)
            // delete this.cmn[i].info
          })
        } */
      }
    }
  }
  toggler(){
    this.toggle = !this.toggle
  }
  // accept leave application
  acceptApp(data) {
    let date = new Date(),
    latest_date = this.datepipe.transform( date, 'DD/MM/YYYY' )
    var tmp = { application_id: data, date_reviewed : latest_date }
    // this.lms.leaveForApproval( tmp )
  }
  // decline leave application
  declineApp( dec_reason, apps ){
    let date = moment().format("DD/MM/YYYY")
    // console.log(date)
    let tmp = { application_id:apps, date_reviewed:date, decline_reason:dec_reason }
    // console.log(tmp)
    this.lms.declineLeave(tmp)
  }
}
