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
      this.cmn = el
      // console.log( new Date().getTime() )
      this.simplyfyData()
      this.application = this.cmn
      // console.log(this.application)
    })
    // if approved leave
    this.lms.emitApprovedApplication.subscribe( el =>{
      this.cmn = el
      // console.log( new Date().getTime() )
      this.simplyfyData()
      this.approvedLeave = this.cmn
      console.log(this.approvedLeave)
    })
    // if cancelled leave
    this.lms.emitCancelledApplication.subscribe( el =>{
      this.cmn = el
      this.simplyfyData()
      this.cancelledLeave = this.cmn
      console.log(this.cancelledLeave)
    })
  }
  ngOnInit(){
    this.lms.getEOL()
    this.lms.approvedLeave()
    this.lms.cancelledLeave()
  }
  // simplyfy Response from all http request
  simplyfyData(){
    // console.log( new Date().getTime() )
    for ( var i = 0; i < this.cmn.length; i++ ){
      this.cmn[i].info.map( r => {
        var t = Object.assign( this.cmn[i], r )
        delete this.cmn[i].info
      })
    }
  }
  toggler(){
    this.toggle = !this.toggle
  }
  // accept leave application
  acceptApp( data : any ) {
    let date = new Date(),
    latest_date = this.datepipe.transform( date, 'dd/MM/yyyy' )
    var tmp = { application_id : data, date_reviewed : latest_date }
    this.lms.leaveForApproval( tmp )
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
