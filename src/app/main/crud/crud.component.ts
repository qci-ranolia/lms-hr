import { Component, OnInit } from '@angular/core'
import { LmsService } from '../../services/lms.service';
declare var $

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {

  employee = new Array
  loader : boolean = false;

  constructor( private lms: LmsService ) {
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()

    this.lms.emitgetEmployees.subscribe( r => {
      this.employee = Object.values(r)
      console.log(this.employee)
    })
    
    setTimeout(() => {
      $(function() {
        let user = $('#table_id').DataTable({
          paging: true,
          searching:true,
          ordering:true,
          scrollY:335
        });
      });
    }, 800 )
    
  }

  ngOnInit() {
    this.lms.getEmployees()
  }

  deleteEmp(qci_id){
    this.lms.deleteEmp(qci_id)
  }

}
