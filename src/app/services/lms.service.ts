import { EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'

import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

// const url = 'http://13.127.13.175:5000/'
const url = 'http://192.168.15.55:5000/'

@Injectable()
export class LmsService {
  loader : boolean = false
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

  constructor(
    private api : ApiService,
    private router : Router,
    public snackBar : MatSnackBar,
    private http: HttpClient
  ){}
  
  // CSV Upload
  public upload( files : Set < File > ) : { [ key : string ] : Observable < number > } {
    
    const status = {}
    files.forEach( file => {
      const formData : FormData = new FormData()
      formData.append( 'file' , file , file.name )
      // console.log(formData)
      const req = new HttpRequest( 'POST', url+'lms/holiday' , formData, {
        reportProgress : true
      })
      // console.log(req)
      const progress = new Subject< number >()
      // console.log(progress)
      this.http.request( req ).subscribe( event => {
        if ( event.type === HttpEventType.UploadProgress ) {
          const percentDone = Math.round( 100 * event.loaded / event.total )
          // console.log(percentDone)
          progress.next( percentDone )
        } else if ( event instanceof HttpResponse ){
          progress.complete()
          // console.log(req)
        }
      })
      status[file.name] = {
        progress:progress.asObservable()
      }
    })
    // console.log(status)
    return status
  }
  showLoader() {
    this.loader = true
    this.emitsload.emit( this.loader )
    setTimeout(() => this.hideLoader(), 1000 )
  }
  hideLoader(){
    this.loader = false
    this.emithload.emit( this.loader )
  }
  snackBars( message : string, action : string ){  
    this.snackBar.open( message, action, {
      duration : 2600,
    })
  }
  isLogin(){
    if( localStorage.getItem('token') ){
      this.router.navigate( ['./'] )
    }
  }
  login( uname : string, pwd : string ){
    let tmp : any
    tmp = { email : uname, password : pwd }
    let temp = JSON.stringify( tmp )
    this.api.Login( temp ).subscribe( el => {
      // console.log( el )
      if ( el.success ){
        localStorage.setItem( 'token' , el.token )
        this.emitLogin.emit()
      } else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" )
  )}
  getEmployees(){
    this.api.GetEmployeeDetails().subscribe( el => {
      if ( el.success ) this.emitgetEmployees.emit( el.data )
      else this.snackBars( "Employee Success is false" , "Try again" ) // this.snackBar.open('el.success was not true')
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) 
  )}
  getHoliday(){
    this.api.getHoliday().subscribe( el => {
      if ( el.success ){
         if (el.result.length == 0 ) console.log("d")
         else this.emitgetHoliday.emit( el.result )
      }
      else this.snackBars( "Response failed" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) 
  )}
  getEOL(){
    this.api.getEOL().subscribe( el => {
      if ( el.success ) {
        if ( el.data.length > 0 ) this.emitEOL.emit( el.data )
        else this.emitZeroEOL.emit( el )
      } else this.snackBars( "leave Applications is false" , "Try Again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" )
  )}
  approvedLeave(){
    this.api.approvedLeave().subscribe( el => {
      if( el.success ) this.emitApprovedApplication.emit(el.data)
      else this.snackBars( "! Success" , "Try Again" ) //stepper.next() //
    }, err => this.snackBars( "API Error" , "Try Again" )
  )}
  cancelledLeave(){
    this.api.cancelledLeave().subscribe( el => {
      if(el.success){
        this.emitCancelledApplication.emit(el.data)
      } else this.snackBars( "! Success" , "Try Again" ) //stepper.next() //
    }, err => this.snackBars( "API Error" , "Try Again" )
  )}
  addEmp( employee : any ) {
    this.api.addEmp( employee ).subscribe( el => {
      if ( el.success ) this.router.navigate(['/employee-list'])
      else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" )
  )}
  updateEmployee( employee : any ) {
    this.api.updateEmployee( employee ).subscribe( el => {
      if(el.success){
        this.router.navigate( ['/employee-list'] )
        this.getEmployees()
      } else this.snackBars( "Not Updated" , "Try again" )
    }, err => this.snackBars( "API err" , "LMS updateEmployee" )
  )}
  deleteEmp(qci_id:any){
    let tmp = { qci_id:qci_id }
    this.api.deleteEmp( tmp ).subscribe( el => {
      if ( el.success ) {
        this.getEmployees()
      } else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "LMS deleteEmployee" )
  )}
  postEOLBSDate( data : any ){
    this.api.postEOLBSDate( data ).subscribe( el => {
      console.log(el)
      if (el.success){
        // this.getEmployees()
      } else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "LMS deleteEmployee" )
  )}
  leaveForApproval( application : any ){
    this.api.leaveForApproval( application ).subscribe( el => {
      if ( el.success ){
        this.getEOL()
        this.approvedLeave()
        this.cancelledLeave()
        this.emitMyApplication.emit(el)
      } else this.snackBars( el.message , el.success )
    }, err => this.snackBars( "API Error" , "Try Again" )
  )}
  declineLeave(tmp:any){
    this.api.declineLeave(tmp).subscribe( el => {
      if ( el.success ){
        this.getEOL()
        this.approvedLeave()
        this.cancelledLeave()
        this.emitMyApplication.emit(el)
        } else this.snackBars( el.message , el.success )
    }, err => this.snackBars( "API Error" , "Try Again" )
  )}
}
