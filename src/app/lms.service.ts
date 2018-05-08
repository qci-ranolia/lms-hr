import{ EventEmitter, Injectable } from '@angular/core'
import { ApiService } from './api.service'

@Injectable()

export class LmsService {
  
  details:any
  
  emitNames = new EventEmitter<any>()
  emitCalendar = new EventEmitter<any>()
  emitfd = new EventEmitter<any>()
  
  // DD:any
  // MM:any
  // Today:any
  // Fire:any

  constructor( private api:ApiService ) {
    
    // Let today = new Date()
    // Let dd = today.getDate()
    // Let mm = today.getMonth()+1
    // Let yyyy = today.getFullYear()
    
    // this.today = mm + '/' + dd + '/' + yyyy;
    
    // console.log(dd)

    // this.details = [
    //   {
    //     data:[
    //       { dt:'1' },
    //       { dt:'2', noeol:'6', employees:[
    //                 { name:'Deepak', leave_bal:'7', loc:'IAEA' },
    //                 { name:'Shubhanshu', leave_bal:'8', loc:'IAEA' },
    //                 { name:'Shashwnk', leave_bal:'7', loc:'IAEA' },
    //                 { name:'Shubham', leave_bal:'8', loc:'IAEA' },
    //                 { name:'Shivam', leave_bal:'7', loc:'IAEA' },
    //                 { name:'Honey', leave_bal:'6', loc:'IAEA' }
    //       ]},
    //       { dt:'3' },
    //       { dt:'4' },
    //       { dt:'5', noeol:'2', employees:[
    //                 { name:'Deepak', leave_bal:'7', loc:'EB' },
    //                 { name:'Shubhanshu', leave_bal:'8', loc:'EB' }
    //       ]},
    //       { dt:'6' },
    //       { dt:'7' },
    //       { dt:'8', noeol:'1', employees:[
    //                 { name:'Deepak', leave_bal:'7', loc:'IMA' }
    //       ]},
    //       { dt:'9' },
    //       { dt:'10' },
    //       { dt:'11' },
    //       { dt:'12' },
    //       { dt:'13' },
    //       { dt:'14' },
    //       { dt:'15' },
    //       { dt:'16' },
    //       { dt:'17' },
    //       { dt:'18' },
    //       { dt:'19' },
    //       { dt:'20' },
    //       { dt:'21' },
    //       { dt:'22' },
    //       { dt:'23', noeol:'2', employees:[
    //                 { name:'Deepak', leave_bal:'7', loc:'ZED' },
    //                 { name:'Deepak 1', leave_bal:'7', loc:'ZED' }
    //       ]},
    //       { dt:'24' },
    //       { dt:'25' },
    //       { dt:'26' },
    //       { dt:'27', noeol:'1', employees:[
    //                 { name:'Deepak', leave_bal:'7', loc:'NABL' },
    //                 { name:'Deepak 1', leave_bal:'7', loc:'NABL' }
    //       ]},
    //       { dt:'28' },
    //       { dt:'29' },
    //       { dt:'30' },
    //       { dt:'31' }
    //     ] 
    //   }
    // ]
    // this.fire = el => {
    //   for ( let i = 0; i++; i < this.details[0].data.length ){
    //     console.log([i])
    //   }
    // }
  }

  addEmp(data:any){
    console.log(data)
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