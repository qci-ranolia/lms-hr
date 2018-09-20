import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'
declare var $
import { RoleComponent } from "./role/role.component"
import { MatDialog } from '@angular/material'
import { EmpcsvComponent } from "./empcsv/empcsv.component"

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
  emplCSV = new Array
  totalLeave = new Array
  loader: boolean = false

  unsubLoader: any
  unsubGetEmployees: any
  unsubTotalLeaves: any
  unsubGetEmpCSV: any

  constructor(private lms: LmsService, private api: ApiService, public dialog: MatDialog) {
    this.unsubLoader = this.lms.emitsload.subscribe( el => this.loader = el )

    this.lms.showLoader()

    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe( r => {
      this.employee = Object.values(r)
    })
    this.unsubTotalLeaves = this.api.emitTotalLeave.subscribe( r => {
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
    this.unsubGetEmpCSV = this.api.emitgetEmpCSV.subscribe( e => {
      for ( let i = 1; i < e.length; i++ ) {
        if ( e[i-1].ID_code == e[i].ID_code ){
          console.log(e[i].ID_code)
          let jack = []
          jack.push('')
        } else {
          console.log(e[i].ID_code)
        }
      }
      // this.emplCSV = e
    })

    let jd = {
      "ID_code": 112,
      "Date_Of_Joining": "Fri, 29 May 2015 00:00:00 GMT",
      "Officials": "Dr Aradhana Chopra",
      "Nature_of_Appointment": "Regular",
      "QCI/Board": "NABET",
      "Email_ID": "aradhna.nabet@qcin.org",
      "Reporting_Officer": null,
      "RO_Email_ID": null,
      Type:[
        {
          "Type of leave": "CL",
          "Opening bal(1jan18)": 9,
          "Credit in advance for the year": 0,
          "Total Leave Till-Dec18": 9,
          "Jan": 1,
          "Feb": 0,
          "Mar": 1,
          "Apr": 0,
          "May": 2,
          "Jun": 0,
          "Jul": 0,
          "Aug": 0,
          "Sep": null,
          "Oct": null,
          "Nov": null,
          "Dec": null,
          "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"
        },
        {
          "Type of leave": "CL",
          "Opening bal(1jan18)": 9,
          "Credit in advance for the year": 0,
          "Total Leave Till-Dec18": 9,
          "Jan": 1,
          "Feb": 0,
          "Mar": 1,
          "Apr": 0,
          "May": 2,
          "Jun": 0,
          "Jul": 0,
          "Aug": 0,
          "Sep": null,
          "Oct": null,
          "Nov": null,
          "Dec": null,
          "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"
        },
        {
          "Type of leave": "CL",
          "Opening bal(1jan18)": 9,
          "Credit in advance for the year": 0,
          "Total Leave Till-Dec18": 9,
          "Jan": 1,
          "Feb": 0,
          "Mar": 1,
          "Apr": 0,
          "May": 2,
          "Jun": 0,
          "Jul": 0,
          "Aug": 0,
          "Sep": null,
          "Oct": null,
          "Nov": null,
          "Dec": null,
          "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"
        }
      ]
    }















  }
  ngOnInit() {
    this.lms.getEmployees()
    this.api.tleave()
    this.api.getEmployeeCSV()
  }
  deleteEmp(qci_id) {
    var tmp = { qci_id: qci_id }
    this.api.deleteEmp(tmp)
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