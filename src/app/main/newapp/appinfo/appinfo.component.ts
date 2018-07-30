import { EventEmitter, Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { ApiService } from '../../../services/api.service'
import { LmsService } from '../../../services/lms.service'
import { MAT_DIALOG_DATA } from '@angular/material'
import { DialogData } from '../newapp.component'
import * as moment from 'moment'
import { DatePipe } from '@angular/common'
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-appinfo',
  templateUrl: './appinfo.component.html',
  styleUrls: ['./appinfo.component.scss']
})

export class AppinfoComponent implements OnInit, OnDestroy {
  public dialogData : DialogData
  proBar : boolean = false
  event = new EventEmitter<any>()
  
  constructor( @Inject( MAT_DIALOG_DATA) public data : DialogData, public datepipe: DatePipe, public dialogRef : MatDialogRef<AppinfoComponent>, public lms : LmsService, private api : ApiService ){ }
  
  ngOnInit(){
    this.dialogData = this.data
    console.log(this.dialogData)
  }
  edit(){
    // this.event.emit(this.dialogData)
    // this.proBar = !this.proBar
    // setTimeout(() => this.proBar = false, 1500 )
    // this.event.subscribe(el=> {
    //   el.event = "edit"
    //   this.dialogData = el
    // })
  }

  modify(){
    // let c = "edit" 
    // this.event.emit(c)
  }

  // accept leave application
  acceptApp(app_id, qci_id){
    // this.dis = true
    // this.spnnr = true
    let date = new Date(),
      latest_date = this.datepipe.transform(date, 'dd/MM/yyyy'),
      tmp = { application_id:app_id, qci_id:qci_id, date_reviewed:latest_date }
    this.api.leaveForApproval(tmp)
  }
  // decline leave application
  declineApp(dec_reason, app_ids){
    // this.dis = true
    // this.spnnr = true
    let date = moment().format("DD/MM/YYYY")
    let tmp = { application_id : app_ids, date_reviewed : date, decline_reason : dec_reason }
    if ( dec_reason ) this.api.declineLeave( tmp )
    else {
      // this.dis = false
      // this.spnnr = false
      this.api.noDeclineReason()
    }
  }
  ngOnDestroy(){
    // unsubscribe
  }
}