import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class LmsService {
  details:any
  emitCalendar = new EventEmitter<any>();
  
  constructor() {
    this.details = [
      {
        dates:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
        employees:[
          { name:'Deepak', leave_bal:'7', appliedDate:'1', appliedMonth:'Jan', appliedYear:'2018' },
          { name:'Shubham', leave_bal:'6', appliedDate:'10', appliedMonth:'Feb', appliedYear:'2018'  },
          { name:'Shubhanshu', leave_bal:'8', appliedDate:'11', appliedMonth:'March', appliedYear:'2018' },
          { name:'Shivam', leave_bal:'7', appliedDate:'16', appliedMonth:'Dec', appliedYear:'2018' }
        ],
        months:['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
        years: ['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'] 
      }
    ]
  }
  
  get(){
    this.emitCalendar.emit( this.details )
  }
  postDate(data:any){
    var x = Object.values( this.details[0].dates )
    var d = x.find( item => item == data )
    console.log(d)
    this.emitCalendar.emit( this.details )
  }
}