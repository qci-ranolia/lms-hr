import { Component, OnInit } from '@angular/core';
import { LmsService } from '../lms.service';

@Component({
  selector: 'app-newapp',
  templateUrl: './newapp.component.html',
  styleUrls: ['./newapp.component.scss']
})
export class NewappComponent implements OnInit {
  loader : boolean = false

  constructor( private lms:LmsService) {
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()
  }

  ngOnInit(){ }

}
