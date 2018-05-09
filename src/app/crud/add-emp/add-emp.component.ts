import { Component, OnInit } from '@angular/core';
import { LmsService } from '../../lms.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {
  getGendr: any
  getEmpTyp: any

  emp: any
  genders:any
  
  show: boolean = false
  hide: boolean = false
  
  mid:any

  constructor( private lms: LmsService ) {
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

  ngOnInit() {
  }
  getGender(item) {
    this.getGendr = item
    if ( this.getGendr == 'Male' ){
      this.hide = true
      this.show = false
    }
    else if ( this.getGendr == 'Female' ) {
      this.show = true
      this.hide = false
    }
  }

  gettoe(item) {
    this.getEmpTyp = item
  }
}
