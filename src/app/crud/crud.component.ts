import { Component, OnInit } from '@angular/core';

declare var $
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor() {
    setTimeout(() => {
      $(function() {
        var user = $('#table_id').DataTable({
          paging:true,
          searching:true,
          ordering:true,
          scrollY:300
        });
      });
    }, 2500);
  }

  ngOnInit() {
  }
}
