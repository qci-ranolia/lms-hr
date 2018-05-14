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
    
    // this.lms.emitsload.subscribe( el => this.loader = el )
    // this.lms.emithload.subscribe( el => this.loader = el )
    // this.lms.showLoader()
    // setTimeout(() => {
    //   this.lms.hideLoader()
    // }, 1000 )
    // this.lms.ge
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
