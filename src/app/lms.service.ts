import{ EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Router } from '@angular/router';

@Injectable()
export class LmsService {
  loader : boolean = false
  emitsload = new EventEmitter<any>()
  emithload = new EventEmitter<any>()

  emitgetEmployees = new EventEmitter<any>()
  emitLogin = new EventEmitter<any>();
  emitErr = new EventEmitter<any>()

  constructor( private api: ApiService, private router: Router ) { }

  showLoader(){
    this.loader = true
    this.emitsload.emit(this.loader)
  }
  hideLoader(){
    this.loader = false
    this.emithload.emit(this.loader)
  }
  isLogin() {
    if ( localStorage.getItem('token')) {
      this.router.navigate(['./'])
    }
  }

  login(uname: string, pwd: string) {
    let tmp : any
    tmp = { email:uname, password:pwd }
    let temp = JSON.stringify(tmp)
    this.api.Login(temp).subscribe( response => {
      if(response.success){
        localStorage.setItem('token',response.token)
        this.emitLogin.emit()
      } else {
        this.emitErr.emit()
      }
    }, err => {
      alert(err)
    })
  }

  getEmployees(){
    this.api.GetEmployeeDetails().subscribe( el => {
      //console.log(el)
      this.emitgetEmployees.emit(el)
      // if (el.success){
      //   //console.log("s")
      //   this.emitgetEmployees.emit(el)
      // } else { console.log(el) }
    }, err => {
      alert(err)
    })
  }
  addEmp(employee:any) {
    this.api.addEmp(employee).subscribe(/*  r => {
      if ( r.success ) console.log("1")
      else console.log("2")
    }, err => {
      console.log(err)
    } */)
  }

  updateEmployee(employee:any){
    this.api.updateEmployee(employee).subscribe( el => { 
      this.emitgetEmployees.emit(el)
    }, err => alert(err))
  }

  deleteEmp( qci_id:any ){
    let tmp = { qci_id:qci_id }
    this.api.deleteEmp(tmp).subscribe( el => {
      if ( el.success == true ){
        this.emitgetEmployees.emit(el)
      } //  else {
      //   alert("Try Again Later");
      // }
    }, err => alert(err) )
  }
}
