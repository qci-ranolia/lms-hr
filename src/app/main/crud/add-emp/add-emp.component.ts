import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../../services/lms.service'
import { ApiService } from '../../../services/api.service'
import { MatDatepickerInputEvent } from "@angular/material/datepicker"

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit, OnDestroy {
  gender: any
  type_of_employee: any
  showEmpTyp: any
  showGender: any
  show: boolean = false
  hide: boolean = false
  employee: any = new Object()
  loader: boolean = false
  form: any
  unsubLoader: any

  date: any
  month: any
  year: any
  constructor(private api: ApiService, private lms: LmsService) {
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
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
    if (this.gender == 'Male') {
      this.hide = true
      this.show = false
    }
    else if (this.gender == 'Female') {
      this.show = true
      this.hide = false
    }
  }
  gettoe(item) {
    this.type_of_employee = item
  }

  addEmployee() {
    this.api.addEmp(this.employee)
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/
    let inputChar = String.fromCharCode(event.charCode)
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault()
    }
  }

  firstDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.getDate()
    this.month = event.value.getMonth()
    this.year = event.value.getFullYear()
    var d: number = this.date,
      m: number = this.month
    if (d < 10) (this.date = '0' + d)
    else (this.date = d)
    if (m < 10) m++ && (this.month = '0' + m)
    else m++ && (this.month = m)
    this.employee["date_of_joining"] = String(this.date + "/" + this.month + "/" + this.year)
    console.log(this.employee["date_of_joining"])
  }
  ngOnDestroy() {
    this.unsubLoader.unsubscribe()
  }
}
