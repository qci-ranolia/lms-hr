import { Component, OnInit } from '@angular/core'
import { LmsService } from '../lms.service';
declare var $

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  employee = new Array
  constructor( private lms: LmsService ) { 
    this.lms.emitgetEmployees.subscribe( r => {
      this.employee = r
    })
    setTimeout(() => {
      $(function() {
        let user = $('#table_id').DataTable({
          paging: true,
          searching:true,
          ordering:true,
          scrollY:300
        });
      });
    }, 1 )
  }
  ngOnInit() {
    this.lms.getEmployees()
  }
}
