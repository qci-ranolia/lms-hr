import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import * as moment from 'moment'
// import * as _ from "lodash"
import { DatePipe } from '@angular/common'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})
export class NewappComponent implements OnInit, OnDestroy {
  hide: boolean = true
  restHide: boolean = true
  dis: any = false
  date: any
  loader: boolean = false
  toggle: boolean = false
  application = new Array()
  cmn: any
  approvedLeave: any
  cancelledLeave: any

  unsubEmployeeOnLeave: any
  unsubCancelledLeave: any
  unsubApprovedLeave: any
  unsubZeroEOL: any
  unsubLoader: any
  unsubAcceptedApplication: any

  employeeOnLeave: any

  constructor(private api: ApiService, private lms: LmsService, public datepipe: DatePipe) {
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()
    // if zero employee on leave
    this.unsubZeroEOL = this.api.emitZeroEOL.subscribe(r => this.hide = false)
    // if pending leave
    this.unsubEmployeeOnLeave = this.api.emitEOL.subscribe(el => {
      this.cmn = el
      this.simplyfiData()
      this.application = this.cmn
    })
    // if approved leave
    this.unsubApprovedLeave = this.api.emitApprovedApplication.subscribe(el => {
      this.cmn = el
      this.simplyfiData()
      this.approvedLeave = this.cmn
    })
    // if cancelled leave
    this.unsubCancelledLeave = this.api.emitCancelledApplication.subscribe(el => {
      this.cmn = el
      this.simplyfiData()
      this.cancelledLeave = this.cmn
    })

    this.unsubAcceptedApplication = this.api.emitMyApplication.subscribe(el => {
      if (el.message == "Leave Approved!!") {
        this.dis = false
        this.api.getEOL()
        this.api.approvedLeave()
        this.api.cancelledLeave()
      }
    })
  }

  ngOnInit() {
    this.api.getEOL()
    this.api.approvedLeave()
    this.api.cancelledLeave()
  }

  // simplyfy Response from all http request
  simplyfiData() {
    if (!(this.cmn.length > 0)) this.restHide = false
    else {
      this.restHide = true
      for (var i = 0; i < this.cmn.length; i++) {
        this.cmn[i].info.map(r => {
          delete this.cmn[i].info[0].application_id
          var t = Object.assign(this.cmn[i], r)
          delete this.cmn[i].info
        })
      }
    }
  }

  toggler() {
    this.toggle = !this.toggle
  }
  // accept leave application
  acceptApp(app_id, qci_id) {
    this.dis = true
    let date = new Date(),
      latest_date = this.datepipe.transform(date, 'dd/MM/yyyy'),
      tmp = { application_id: app_id, qci_id: qci_id, date_reviewed: latest_date }
    this.api.leaveForApproval(tmp)
  }
  // decline leave application
  declineApp(dec_reason, app_ids) {
    let date = moment().format("DD/MM/YYYY")
    let tmp = { application_id: app_ids, date_reviewed: date, decline_reason: dec_reason }
    this.lms.declineLeave(tmp)
    this.api.leaveForApproval(tmp)
  }
  ngOnDestroy() {
    this.unsubEmployeeOnLeave.unsubscribe()
    this.unsubCancelledLeave.unsubscribe()
    this.unsubApprovedLeave.unsubscribe()
    this.unsubLoader.unsubscribe()
  }

}