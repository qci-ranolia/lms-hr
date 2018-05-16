import { Component, OnInit } from '@angular/core';
import { LmsService } from '../../services/lms.service';

declare var $
  
@Component({
  selector: 'app-eol',
  templateUrl: './eol.component.html',
  styleUrls: ['./eol.component.scss']
})
export class EolComponent implements OnInit {
  loader : boolean = false
  
  constructor( private lms: LmsService ) {
    
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
    
    // this.lms.ge
    setTimeout(() => {
      $(function(){
        let user = $('#table_id').DataTable({
          paging : true,
          searching : true,
          ordering : true,
          scrollY : 335
        })
      })
    }, 850 )
  }

  ngOnInit() {
  }

}
