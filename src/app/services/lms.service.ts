import { EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'

@Injectable()
export class LmsService {
  loader: boolean = false
  count: any

  emitsload = new EventEmitter<any>()
  emithload = new EventEmitter<any>()

  emitgetEmployees = new EventEmitter<any>() // Emit Employees
  emitLogin = new EventEmitter<any>() // Emit Login
  emitErr = new EventEmitter<any>() // Emit Err , not using right now
  emitEOL = new EventEmitter<any>() // Emit Employee On Leaves
  emitgetHoliday = new EventEmitter<any>()
  emitZeroEOL = new EventEmitter<any>() // Emit Zero employees on leaves
  emitMyApplication = new EventEmitter<any>()
  emitApprovedApplication = new EventEmitter<any>()
  emitCancelledApplication = new EventEmitter<any>()
  emitCount = new EventEmitter<any>()
  emitEmpOnLeave = new EventEmitter<any>()

  constructor(private api: ApiService, private router: Router, public snackBar: MatSnackBar) { }

  showLoader() {
    this.loader = true
    this.emitsload.emit(this.loader)
    setTimeout(() => this.hideLoader(), 1000)
  }
  hideLoader() {
    this.loader = false
    this.emithload.emit(this.loader)
  }
  snackBars(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2600,
    })
  }
  getEmployees() {
    this.api.GetEmployeeDetails().subscribe(el => {
      if (el.success) this.emitgetEmployees.emit(el.data)
      else this.snackBars('Employee Details', 'Try again!')
    }, err => this.router.navigate(['/404'])
    )
  }
  deleteEmp(qci_id: any) {
    let tmp = { qci_id: qci_id }
    /* this.api.deleteEmp(tmp) */
  }
  postEOLBSDate(data: any) {
    // this.api.postEOLBSDate(data)
  }
}
