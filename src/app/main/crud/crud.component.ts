import { Component, OnInit, OnDestroy } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'
declare var $

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  employee = new Array
  loader: boolean = false

  unsubLoader: any
  unsubGetEmployees: any

  constructor(private lms: LmsService, private api: ApiService) {
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()

    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => {
      this.employee = Object.values(r)
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
  }
  deleteEmp(qci_id) {
    var tmp = { qci_id: qci_id }
    this.api.deleteEmp(tmp)
    this.lms.getEmployees()
  }
  ngOnDestroy() {
    this.unsubLoader.unsubscribe()
    this.unsubGetEmployees.unsubscribe()
  }

}