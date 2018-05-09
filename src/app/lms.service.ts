import{ EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'

@Injectable()

export class LmsService {
  
  details:any
  
  emitNames = new EventEmitter<any>()
  emitCalendar = new EventEmitter<any>()
  emitfd = new EventEmitter<any>()
  

  constructor( private api:ApiService ) {
  }

  addEmp( qciId:number, designation:string, empname:string, password:any, getGendr:string, getEmpTyp:string ){
    let tmp = { qciId:qciId, designation:designation, empname:empname, password:password, getGendr:getGendr, getEmpTyp:getEmpTyp }
    this.api.addEmpl(tmp)//.subscribe( res=> console.log(res) )
  }

  get(){
    this.emitCalendar.emit(this.details)
  }
  
  postData(data:any){
    // var x = Object.values(this.details[0].data)
    // console.log(x)
    // var d = x.find( item => item == data )
    // console.log(d)

    // if (!d.employees) this.emitNames.emit(d.employees)
    // else if (d.employees === undefined ) console.log("Undefined do something")
    // else this.emitNames.emit(d.employees)
    // this.emitNames.emit(d.employees)
  }

}