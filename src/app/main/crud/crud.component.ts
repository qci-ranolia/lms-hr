import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'
declare var $
import { RoleComponent } from "./role/role.component"
import { MatDialog } from '@angular/material'
import { EmpcsvComponent } from "./empcsv/empcsv.component"


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  
  employee = new Array
  emplCSV = new Array
  employeeCSV = new Array // new array made by me due to lack of experts

  totalLeave = new Array
  loader: boolean = false

  unsubLoader: any
  unsubGetEmployees: any
  unsubTotalLeaves: any
  unsubGetEmpCSV: any

  jack: any

  /* toArray(cl:object){
    return Object.keys(cl).map(key => console.log(key))
  } */

  constructor(private lms:LmsService, private api:ApiService, public dialog:MatDialog){

    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()

    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => {
      this.employee = Object.values(r)
    })
    this.unsubTotalLeaves = this.api.emitTotalLeave.subscribe(r => {
      this.totalLeave = r[0]
    })
    setTimeout(() => {
      $(function () {
        let user = $('#table_id').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          scrollY: 335
        })
      })
    }, 800)
    this.unsubGetEmpCSV = this.api.emitgetEmpCSV.subscribe(e => {
      console.log(e)
      this.emplCSV = e
    })
  }
  ngOnInit() {
    this.lms.getEmployees()
    // this.api.tleave()
    this.api.getEmployeeCSV()
    // this.api.testCSV()
  }
  deleteEmp(qci_id) {
    var tmp = { qci_id: qci_id }
    /* this.api.deleteEmp(tmp) */
    this.lms.getEmployees()
  }
  public openUploadDialog($e) {
    $e.stopPropagation()
    let dialogRef = this.dialog.open(EmpcsvComponent, { width: "50%", height: "50%" })
  }
  assignRole() {
    this.dialog.open(RoleComponent, {
      width: "60%",
      height: "75%",
      //data: item
    })
  }
  ngOnDestroy() {
    this.unsubLoader.unsubscribe()
    this.unsubGetEmployees.unsubscribe()
    this.unsubGetEmpCSV.unsubscribe()
  }
}