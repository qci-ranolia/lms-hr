import { EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'

import { HttpClient } from '@angular/common/http'

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

  constructor(private api: ApiService, private router: Router, public snackBar: MatSnackBar, private httpClient: HttpClient) { }

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
  isLogin() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['./'])
    }
  }
  login(uname: string, pwd: string) {
    let tmp: any
    tmp = { email: uname, password: pwd }
    let temp = JSON.stringify(tmp)
    this.api.Login(temp).subscribe(el => {
      if (el.success) {
        localStorage.setItem('token', el.token)
        this.emitLogin.emit()
      } else this.snackBars(el.message, el.success)
    }, err => this.router.navigate(['/404'])
    )
  }
  getEmployees() {
    this.api.GetEmployeeDetails().subscribe(el => {
      if (el.success) this.emitgetEmployees.emit(el.data)
      else this.snackBars(el.message, el.success) // this.snackBar.open('el.success was not true')
    }, err => this.router.navigate(['/404'])
    )
  }
  getHoliday() {
    this.api.getHoliday()/* .subscribe( el => {
      if ( el.success ){
         if ( el.result.length == 0 ) console.log("d")
         else this.emitgetHoliday.emit( el.result )
      }
      else this.snackBars( el.message , el.success )
    }, err => this.router.navigate(['/404']) ) */
  }
  getEOL() {
    this.api.getEOL()
  }
  approvedLeave() {
    this.api.approvedLeave()
  }
  cancelledLeave() {
    this.api.cancelledLeave()
  }
  leaveForApproval(application: any) {
    this.api.leaveForApproval(application)/* .subscribe( el => {
      console.log(el)
      if ( el.success ){
        // this.getEOL()
        // this.approvedLeave()
        // this.cancelledLeave()
        this.emitMyApplication.emit( el )
      } else this.snackBars( el.message , el.success )
    }, err => this.router.navigate(['/404']) ) */
  }
  declineLeave(tmp: any) {
    this.api.declineLeave(tmp)/* .subscribe(el => {
      if (el.success) {
        // this.getEOL()
        // this.approvedLeave()
        // this.cancelledLeave()
        this.emitMyApplication.emit(el)
      } else this.snackBars(el.error, el.success)
    }, err => this.router.navigate(['/404'])
    ) */
  }

  addEmp(employee: any) {
    this.api.addEmp(employee).subscribe(el => {
      if (el.success) this.router.navigate(['/employee-list'])
      else this.snackBars(el.message, el.success)
    }, err => this.router.navigate(['/404'])
    )
  }
  getEmpOnLeave(temp: any) {
    this.api.getEmpOnLeave(temp)/* .subscribe(el => {
      console.log(el)
      if (el.success) this.emitEmpOnLeave.emit(el.data)
      else this.snackBars(el.error, el.success)
    }, err => this.router.navigate(['/404'])
    ) */
  }
  updateEmployee(employee: any) {
    this.api.updateEmployee(employee).subscribe(el => {
      if (el.success) {
        this.router.navigate(['/employee-list'])
        this.getEmployees()
      } else this.snackBars(el.message, el.success)
    }, err => this.router.navigate(['/404'])
    )
  }
  deleteEmp(qci_id: any) {
    let tmp = { qci_id: qci_id }
    this.api.deleteEmp(tmp).subscribe(el => {
      if (el.success) {
        this.getEmployees()
      } else this.snackBars(el.message, el.success)
    }, err => this.router.navigate(['/404'])
    )
  }
  postEOLBSDate(data: any) {
    this.api.postEOLBSDate(data).subscribe(el => {
      if (el.success) this.emitCount.emit(el.data)
      else this.snackBars(el.error, el.success)
    }, err => this.router.navigate(['/404'])
    )
  }
}
