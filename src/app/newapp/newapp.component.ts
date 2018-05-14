import { Component, OnInit } from '@angular/core';
import { LmsService } from '../lms.service';

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})
export class NewappComponent implements OnInit {

  constructor( private lms:LmsService) {
    // this.lms.emitsload.subscribe( el => this.loader = el )
    // this.lms.emithload.subscribe( el => this.loader = el )
    // this.lms.showLoader()
    // setTimeout(() => {
    //   this.lms.hideLoader()
    // }, 1000 )
  }

  ngOnInit() {
  }

}
