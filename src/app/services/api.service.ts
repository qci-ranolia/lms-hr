import { EventEmitter, Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router'
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material' // remove from lms service after all promise< resolve,reject> successfully implemented here

@Injectable()
export class ApiService {
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
  emitEmpApp = new EventEmitter<any>()

  // URL : string = "http://13.127.13.175:5000/"
  URL: string = "http://192.168.15.55:5000/"
  token: string // Useful in Authentication
  headers: any // Useful when backend and frontend have different IP's
  opts: any // Find more details about backend configuration

  constructor(public snackBar: MatSnackBar, private http: Http, private router: Router, private httpClient: HttpClient) {
    // Private http : Http, private router : Router
    // We will use both imports here. Are we using anywhere in comments only ???
    this.token = localStorage.getItem('token') // If this token available, login using can activate gaurd
    this.headers = new Headers() // Default headers
    this.headers.append('Authorization', this.token) // ADD/Append your authorized token to Default headers
    this.opts = new RequestOptions()
    this.opts.headers = this.headers
  }

  snackBars(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2600,
    })
  }
  // CSV Upload
  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    // create a const to capture/record status of file
    const status = {}
    // for each files
    files.forEach(file => {
      const formData: FormData = new FormData()
      formData.append('file', file, file.name)
      const req = new HttpRequest('POST', this.URL + 'lms/holiday', formData, {
        reportProgress: true
      })
      const progress = new Subject<number>()
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total)
          progress.next(percentDone)
        } else if (event instanceof HttpResponse) {
          progress.complete()
        }
      })
      status[file.name] = { progress: progress.asObservable() }
    })
    return status
  }
  // Login Section
  Login(data: any) {
    return this.http.post(this.URL + 'lms/loginAdmin', data).map(r => r.json())
  }
  // Get Requests
  // HINT : Are we checking the response is a success or not ???
  // Get Employee
  GetEmployeeDetails() {
    return this.http.get(this.URL + 'lms/employeeDetails', this.opts).map(r => r.json())
  }
  // Get Employee_on_leave
  getEOL() {
    return new Promise((resolve) => {
      this.http.get(this.URL + 'lms/input', this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) {
            if (response.data.length > 0) this.emitEOL.emit(response.data)
            else this.emitZeroEOL.emit(response)
          } else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.get( this.URL+'lms/input', this.opts ).map( r => r.json() )
  }
  // Get QCI Calendar
  getHoliday() {
    return new Promise((resolve) => {
      this.http.get(this.URL + 'lms/holiday', this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) {
            if (response.result.length == 0) console.log("d")
            else this.emitgetHoliday.emit(response.result)
          }
          else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.get( this.URL+'lms/holiday', this.opts ).map( r => r.json() )
  }
  // Get approved employee list on leaves
  approvedLeave() {
    return new Promise((resolve) => {
      this.http.get(this.URL + 'lms/output1', this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) this.emitApprovedApplication.emit(response.data)
          else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.get( this.URL+'lms/output1', this.opts ).map( r => r.json() )
  }
  // Get cancelled/rejected leave of employee's
  cancelledLeave() {
    return new Promise((resolve) => {
      this.http.get(this.URL + 'lms/output2', this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) this.emitCancelledApplication.emit(response.data)
          else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.get( this.URL+'lms/output2', this.opts ).map( r => r.json() )
  }
  // post employee application for approval
  // acceptApp( app_id, qci_id ){}
  leaveForApproval(data: any) {
    return new Promise((resolve) => {
      this.http.post(this.URL + 'lms/approveLeave', data, this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) {
            this.emitMyApplication.emit(response)
            //console.log(data)
            // does not refresh after response
          } else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.post( this.URL+'lms/approveLeave', data, this.opts ).map( r => r.json() )
  }
  // Post decline leave of employee's
  declineLeave(data: any) {
    return new Promise((resolve) => {
      this.http.post(this.URL + 'lms/declineLeave', data, this.opts)
        .map(res => res.json())
        .subscribe(response => {
          // console.log(response)
          if (response.success) {
            // this.emitMyApplication.emit(response)
          } else this.snackBars(response.message, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.post(this.URL + 'lms/declineLeave', data, this.opts).map(r => r.json())
  }
  // Post month dates to get employee on leave in a month
  postEOLBSDate(data: any) {
    let tmp = { dates: data }
    return this.http.post(this.URL + 'lms/count', tmp, this.opts).map(r => r.json())
  }
  getEmpOnLeave(data: any) {
    let tmp = { date: data }
    return new Promise((resolve) => {
      this.http.post(this.URL + 'lms/empOnLeave', tmp, this.opts)
        .map(res => res.json())
        .subscribe(response => {
          if (response.success) {
            this.emitEmpOnLeave.emit(response.data)
            this.emitEmpApp.emit(response.app_detail)
          } else this.snackBars(response.error, response.success)
          resolve(true)
        }, err => this.router.navigate(['/404']))
    })
    // return this.http.post(this.URL + 'lms/empOnLeave', tmp, this.opts).map(r => r.json())
  }
  // Post( Add New Employee ) requests
  addEmp(data: any) {
    return this.http.post(this.URL + 'lms/addEmployee', data, this.opts).map(r => r.json())
  }
  // Post( Update Existing Employee ) requests
  updateEmployee(data: any) {
    return this.http.post(this.URL + 'lms/editEmployeeDetails', data, this.opts).map(r => r.json())
  }
  // Post ( Delete Existing Employee ) requests
  deleteEmp(data: any) {
    return this.http.post(this.URL + 'lms/deleteEmployee', JSON.stringify(data), this.opts).map(r => r.json())
  }

}