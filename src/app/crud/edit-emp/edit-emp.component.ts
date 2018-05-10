import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LmsService } from 'v3/leave-management-system/src/app/lms.service';

import * as _ from "lodash"

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit {
  employee : any = new Object()
  uid : any
  key : any
  
  constructor(private route:ActivatedRoute, private router:Router, private lms:LmsService ) {
    // this.lms.emitgetEmployees.subscribe( r => {
    //   this.employee = r
    //   console.log(this.employee)
    // })
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id')
    
    this.lms.emitgetEmployees.subscribe( r => {
      let arr = Object.values(r)
      var item = arr.find( it => it.qci_id == this.uid )
      this.employee = item
      var skey = _.findKey( r, this.employee )
      this.key = skey
      console.log(this.employee)

    })
    this.lms.getEmployees()
    // this.bookService.getMe().subscribe( data => {
    //     let arr = Object.values(data)
    //     var item = arr.find( it => it.id == this.uid )
    //     this.book = item
    //     var skey = _.findKey( data, this.book )
    //     this.key = skey
    // })

  }

}
