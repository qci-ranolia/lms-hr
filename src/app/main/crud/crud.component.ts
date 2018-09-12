import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'
declare var $
import { RoleComponent } from "./role/role.component"
import { MatTabChangeEvent, MatDialog } from '@angular/material'

declare var $
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
  totalLeave = new Array
  loader: boolean = false

  unsubLoader: any
  unsubGetEmployees: any
  unsubTotalLeaves: any

  constructor(private lms: LmsService, private api: ApiService, public dialog: MatDialog) {
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()

    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => {
      this.employee = Object.values(r)
    })
    this.unsubTotalLeaves = this.api.emitTotalLeave.subscribe(r => {
      // console.log(r[0])
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
  }
  ngOnInit() {
    this.lms.getEmployees()
    this.api.tleave()
  }
  deleteEmp(qci_id) {
    var tmp = { qci_id: qci_id }
    this.api.deleteEmp(tmp)
    this.lms.getEmployees()
  }
  // public openApplicationModal() {
  //   //var item = this.case.find(it => it.application_id == application_id) // linear search
  //   //item.event = event
  //   this.dialog.open( RoleComponent, {
  //     width: "60%",
  //     height: "75%",
  //     //data: item
  //   })
  // }
  assignRole() {
    this.dialog.open(RoleComponent, {
      width: "60%",
      height: "75%",
      //data: item
    })
    // this.openApplicationModal()
  }
  ngOnDestroy() {
    this.unsubLoader.unsubscribe()
    this.unsubGetEmployees.unsubscribe()
  }

}