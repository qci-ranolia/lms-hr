import { Component, OnInit } from '@angular/core';
import { LmsService } from '../lms.service';

declare var $
  
@Component({
  selector: 'app-eol',
  templateUrl: './eol.component.html',
  styleUrls: ['./eol.component.scss']
})
export class EolComponent implements OnInit {

  constructor( private lms: LmsService ) {
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
  }

}
