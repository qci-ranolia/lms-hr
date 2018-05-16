import { Component, OnInit } from '@angular/core'
import { LmsService } from '../../../services/lms.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})

export class AddEmpComponent implements OnInit {
  gender : any
  type_of_employee : any

  showEmpTyp : any
  showGender : any
  
  show : boolean = false
  hide : boolean = false
  
  employee : any = new Object()
  loader : boolean = false

  constructor( private lms: LmsService, private router : Router ) {
    
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    
    this.showGender = [
      { value: 'Male' },
      { value: 'Female' }
    ]

    this.showEmpTyp = [
      { value: 'Regular' },
      { value: 'Contract' },
      { value: 'Professional' }
    ]
  
  }

  ngOnInit() { }

  getGender(item) {
    this.gender = item
    if ( this.gender == 'Male' ) {
      this.hide = true
      this.show = false
    }
    else if ( this.gender == 'Female' ) {
      this.show = true
      this.hide = false
    }
  }

  gettoe(item) {
    this.type_of_employee = item
  }

  addEmployee(){
    this.lms.addEmp(this.employee)
  }

}
