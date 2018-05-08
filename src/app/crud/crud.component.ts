import { Component, OnInit } from '@angular/core'
import { LmsService } from 'leave-management-system/src/app/lms.service';
declare var $

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {
  genders:any
  emp:any

  getGendr : any
  getEmpTyp : any
  arr = []
  ruleElement : any
  qciId : any
  designation : any
  empname : any
  password : any
  
  constructor( private lms:LmsService) {
    
    setTimeout(() => {
      $(function() {
        var user = $('#table_id').DataTable({
          paging:true,
          searching:true,
          ordering:true,
          scrollY:300
        });
      });
    }, 1 )

    this.genders = [
      { value: 'Male' },
      { value: 'Female' }
    ]

    this.emp = [
      { value: 'Regular' },
      { value: 'Contract' },
      { value: 'Professional' }
    ]
  }

  ngOnInit(){}
  
  getGender(item){
    this.getGendr = item
  }
  gettoe(item){
    this.getEmpTyp = item
  }

  addEmployee($event){
    $event.preventDefault()
    this.arr.push(this.qciId)
    this.arr.push(this.designation)
    this.arr.push(this.empname)
    this.arr.push(this.password)
    this.arr.push(this.getGendr)
    this.arr.push(this.getEmpTyp)
    this.lms.addEmp(this.arr)
  }

}
