import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'
import * as moment from 'moment'
import { DatePipe } from '@angular/common'
import { AppinfoComponent } from "./appinfo/appinfo.component"
import { MatTabChangeEvent, MatDialog } from '@angular/material'

declare var $
export interface DialogData {
  animal: 'accept' | 'cancel' | 'reject'
}

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})

export class NewappComponent implements OnInit, OnDestroy {
  hide: boolean = true
  restHide: boolean = true
  spnnr: boolean = false
  dis: any = false
  date: any
  table: any
  loader: boolean = false
  toggle: boolean = false
  edit: boolean = false
  cmn: any = new Array()
  application = new Array()
  approvedLeave: any
  cancelledLeave: any

  unsubEmployeeOnLeave: any
  unsubCancelledLeave: any
  unsubApprovedLeave: any
  unsubZeroEOL: any
  unsubLoader: any
  unsubAcceptedApplication: any
  employeeOnLeave: any

  application_id: any
  case: any
  applicationData: any = new Array()
  proBar:boolean = false

  constructor(private api: ApiService, private lms: LmsService, public datepipe: DatePipe, public dialog: MatDialog) {
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()
    setTimeout(() => {
      $(function () {
        this.table = $('#table_new').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          scrollY: 335
        })
      })
    }, 800)
    // if zero employee on leave
    this.unsubZeroEOL = this.api.emitZeroEOL.subscribe(r => this.hide = false)
    // if pending leave
    this.unsubEmployeeOnLeave = this.api.emitEOL.subscribe( el => {
      this.cmn.push(el)
      this.simplyfiData()
      this.application = this.cmn[this.cmn.length - 1]
      this.case = this.application
    })
    // if approved leave
    this.unsubApprovedLeave = this.api.emitApprovedApplication.subscribe( el => {
      this.cmn.push(el)
      this.simplyfiData()
      this.approvedLeave = this.cmn[this.cmn.length - 1]
    })
    // if cancelled leave
    this.unsubCancelledLeave = this.api.emitCancelledApplication.subscribe( el => {
      this.cmn.push(el)
      this.simplyfiData()
      this.cancelledLeave = this.cmn[this.cmn.length - 1]
    })
    this.unsubAcceptedApplication = this.api.emitMyApplication.subscribe( el => {
      // this.dis = false
      // this.spnnr = false
      this.api.getEOL()
      switch (el.message) {
        case "Leave Approved!!":
          this.api.approvedLeave()
          break
        case "Leave has been declined.":
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
      var i = this.cmn.length - 1
      for (var j = 0; j < this.cmn[i].length; j++) {
        this.cmn[i][j].info.map(r => {
          delete this.cmn[i][j].info[0].application_id
          var t = Object.assign(this.cmn[i][j], r)
          delete this.cmn[i][j].info
        })
      }
    }
  }
  whichApplication($event: MatTabChangeEvent) {
    switch ($event.index) {
      case 0:
        $('#table_approve').DataTable().destroy()
        $('#table_cancel').DataTable().destroy()
        this.table = $('#table_new').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          scrollY: 335
        })
        this.case = this.application
        break
      case 1:
        $('#table_new').DataTable().destroy()
        $('#table_cancel').DataTable().destroy()
        this.table = $('#table_approve').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          scrollY: 335
        })
        this.case = this.approvedLeave
        break
      case 2:
        $('#table_new').DataTable().destroy()
        $('#table_approve').DataTable().destroy()
        this.table = $('#table_cancel').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          scrollY: 335
        })
        this.case = this.cancelledLeave
    }
  }
  // commen dialog for all the application related queries
  public openApplicationModal(application_id, event) {
    var item = this.case.find(it => it.application_id == application_id) // linear search
    item.event = event
    this.dialog.open(AppinfoComponent, {
      width: "60%",
      height: "75%",
      data: item
    })
  }
  appInfo(application_id, qci_id) {
    localStorage.setItem('ID_code', qci_id)
    let event = 'info'
    this.openApplicationModal(application_id, event)
  } appAccept(application_id, qci_id) {
    localStorage.setItem('ID_code', qci_id)
    let event = 'accept'
    this.openApplicationModal(application_id, event)
  } appEdit(application_id, qci_id) {
    localStorage.setItem('ID_code', qci_id)
    let event = 'edit'
    this.openApplicationModal(application_id, event)
  } appCancel(application_id, qci_id) {
    localStorage.setItem('ID_code', qci_id)
    let event = 'decline'
    this.openApplicationModal(application_id, event)
  }
  toggler() {
    this.toggle = !this.toggle
  }
  // accept leave application
  acceptApp(app_id, qci_id) {
    this.dis = true
    this.spnnr = true
    let date = new Date(),
      latest_date = this.datepipe.transform(date, 'dd/MM/yyyy'),
      tmp = { application_id: app_id, qci_id: qci_id, date_reviewed: latest_date }
    this.api.leaveForApproval(tmp)
    this.api.getEOL()
  }
  // decline leave application
  declineApp(dec_reason, app_ids) {
    this.dis = true
    this.spnnr = true
    let date = moment().format("DD/MM/YYYY")
    let tmp = { application_id: app_ids, date_reviewed: date, decline_reason: dec_reason }
    if (dec_reason) this.api.declineLeave(tmp)
    else {
      this.dis = false
      this.spnnr = false
      this.api.noDeclineReason()
      this.api.getEOL()
    }
  }
  // Conjugate gradient
  // d<sub>(i+1) = g<sub>(i+1) + d<sub>i*Y<sub>i, i = 0,1

  // editApp(){
  //   this.edit = !this.edit
  //   console.warn( " In Progress... " )
  //   // const interpolationSearch = (array, key) => {
  //   //   // if array is empty
  //   //   if (!array.length){
  //   //     return -1
  //   //   }
  //   //   let low = 0
  //   //   let high = array.length - 1
  //   //   while ( low <= high && key >= array[low] && x <= array[high] ){
  //   //     // calculate position with
  //   //     let pos = low + Math.floor(((high - low) * (key - array[low])) / (array[high] - array[low]))
  //   //     // if all elements are same then we'll have divide by 0 or 0/0
  //   //     // which may cause NaN
  //   //     pos = Number.isNaN(pos) ? low : pos
  //   //     if (array[pos] === key){
  //   //       return pos
  //   //     }
  //   //     if (array[pos] > key){
  //   //       high = pos - 1
  //   //     } else {
  //   //       low = pos + 1
  //   //     }
  //   //   }
  //   //   // not found
  //   //   return -1
  //   // }
  // }

  ngOnDestroy() {
    this.unsubEmployeeOnLeave.unsubscribe()
    this.unsubCancelledLeave.unsubscribe()
    this.unsubApprovedLeave.unsubscribe()
    this.unsubLoader.unsubscribe()
    localStorage.removeItem('qci_id')
  }
}
