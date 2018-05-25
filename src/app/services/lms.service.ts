import { EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'

@Injectable()
export class LmsService {
  loader : boolean = false
  emitsload = new EventEmitter<any>()
  emithload = new EventEmitter<any>()

  emitgetEmployees = new EventEmitter<any>() // Emit Employees
  emitLogin = new EventEmitter<any>() // Emit Login
  emitErr = new EventEmitter<any>() // Emit Err , not using right now
  emitEOL = new EventEmitter<any>() // Emit Employee On Leaves

  constructor(
    private api: ApiService,
    private router: Router,
    public snackBar: MatSnackBar
  ){}

  showLoader() {
    this.loader = true
    this.emitsload.emit(this.loader)
    setTimeout(() => {
      this.hideLoader()
    }, 1000 )
  }

  hideLoader(){
    this.loader = false
    this.emithload.emit(this.loader)
  }

  snackBars( message:string, action:string ){  
    this.snackBar.open(message,action,{
      duration:2600,
    })
  }
  
  isLogin() {
    if(localStorage.getItem('token')){
      this.router.navigate(['./'])
    }
  }

  login( uname:string, pwd:string ){
    let tmp : any
    tmp = { email : uname, password : pwd }
    let temp = JSON.stringify(tmp)
    this.api.Login(temp).subscribe(el => {
      // console.log(el)
      if ( el.success ){
        localStorage.setItem( 'token' , el.token )
        this.emitLogin.emit()
      } else this.snackBars("Success is false" , "Try again" )
    }, err => this.snackBars("API err" , "Contact back-end IT or try one more time" ) )
  }

  getEmployees(){
    this.api.GetEmployeeDetails().subscribe( el => {
      // console.log(el)
      this.emitgetEmployees.emit(el.data)
      // if ( el.success ) this.emitgetEmployees.emit(el.data)
      // else console.log(el) // this.snackBar.open('el.success was not true')
    }, err => this.snackBars("API err" , "Contact back-end IT or try one more time" ) 
  )}

  addEmp( employee : any ) {
    this.api.addEmp(employee).subscribe( el => {
      // this.router.navigate(['/employee-list'])
      console.log(el)
      if ( el.success ) this.router.navigate(['/employee-list'])
      else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) )
  }

  GetEOL() {
    this.api.GetEOL().subscribe( el => {
      if ( el.success ) this.emitEOL.emit(el.data)
      else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) )  
  }

  updateEmployee( employee : any ) {
    this.api.updateEmployee(employee).subscribe( el => { 
      this.router.navigate(['/employee-list'])
      // console.log(el)
      // if ( el.success == true )
      this.getEmployees()
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) )
  }

  deleteEmp( qci_id : any ) {
    let tmp = { qci_id:qci_id }
    this.api.deleteEmp(tmp).subscribe( el => {
      if ( el.success == true ){
        this.getEmployees()
      } else this.snackBars( "Success is false" , "Try again" )
    }, err => this.snackBars( "API err" , "Contact back-end IT or try one more time" ) )
  }

}
