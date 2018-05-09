import { Component, OnInit } from '@angular/core'
import { LmsService } from '../lms.service';
declare var $

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {
  
  getGendr : any
  getEmpTyp : any
  


  qciId : any
  empname : any
  email:any
  board:any
  designation : any
  emp:any
  genders:any
  balCl:any
  balSl:any
  balPl:any
  balMl:any
  balPtl:any
  password : any
  
  show: boolean = false
  hide: boolean = false
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
    // console.log(this.getGendr)
    if ( this.getGendr == 'Male' ){
      this.hide = true
      this.show = false
    }
    else{
     this.show = true
     this.hide = false
    }
  }
  gettoe(item){
    this.getEmpTyp = item
  }

  addEmployee($event){
    $event.preventDefault()
    this.lms.addEmp(this.qciId,this.empname,this.email,this.board,this.designation,this.password,this.getGendr,this.getEmpTyp,this.balCl,this.balSl,this.balPl,this.balMl,this.balPtl)
  }

}
