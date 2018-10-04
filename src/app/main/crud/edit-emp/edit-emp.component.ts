import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'// , Router, Params 
import { LmsService } from '../../../services/lms.service'
import { ApiService } from '../../../services/api.service'
// import * as _ from "lodash"

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit, OnDestroy {
  employee: any = new Object()
  uid: any
  key: any
  gender: any
  show: boolean = false
  hide: boolean = false

  loader: boolean = false

  unsubLoader: any
  unsubGetEmployees: any

  constructor(private route: ActivatedRoute, private lms: LmsService, private api: ApiService) { // private router:Router,
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()

    this.uid = this.route.snapshot.paramMap.get('id')
    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => {
      console.log(r)
      let arr = Object.values(r)
      // var item = arr.find(it => it.qci_id == this.uid)
      // this.employee = item
      // console.log(this.employee)
      // this.employee.password = null
      // if (this.employee.gender == 'Male') {
      //   this.hide = true
      //   this.show = false
      // }
      // else if (this.employee.gender == 'Female') {
      //   this.show = true
      //   this.hide = false
      // }
    })
  }
  ngOnInit() {
    this.lms.getEmployees()
  }
  updateEmployee() {
    delete this.employee['d_o_j']
    delete this.employee['manager_email']
    delete this.employee['total_cl']
    delete this.employee['total_ml']
    delete this.employee['total_pl']
    delete this.employee['total_ptl']
    delete this.employee['total_sl']
    this.api.updateEmployee(this.employee)
  }
  ngOnDestroy() {
    this.unsubGetEmployees.unsubscribe()
  }
}
