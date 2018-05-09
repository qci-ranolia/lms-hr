import{ EventEmitter, Injectable } from '@angular/core'

import { ApiService } from './api.service'

import { Mid } from './middleware'

@Injectable()

export class LmsService {

  emitEmployee = new EventEmitter<any>()
  
  mid: Mid = {
    qci_id: 1,
    name: 'string',
    email: 'string',
    board: 'string',
    designation: 'string',
    type_of_employee: 'string',
    Gender: 'string',
    bal_cl: 10,
    bal_sl: 10,
    bal_pl: 10,
    bal_ml: 10,
    bal_ptl: 10,
    bal_eol: 10,
    password: 'string'
  }

  constructor( private api: ApiService ) {
  }

  getEmp(){
    this.emitEmployee.emit(this.mid)
  }
  addEmp(){
    // let tmp = { qciId:qciId, designation:designation, empname:empname, password:password, getGendr:getGendr, getEmpTyp:getEmpTyp }
    // this.api.addEmpl(tmp)//.subscribe( res=> console.log(res) )
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
