import { Component, OnInit } from '@angular/core';
// import { MatTabsModule } from '@angular/material/tabs';
import { LmsService } from '../lms.service';

@Component({
  selector:'app-nav',
  templateUrl:'./nav.component.html',
  styleUrls:['./nav.component.scss']
})

export class NavComponent implements OnInit {
  constructor( private service:LmsService ){ }

  ngOnInit(){ }

}
