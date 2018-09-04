import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LmsService } from '../../services/lms.service'
import { ApiService } from '../../services/api.service'

declare var $

@Component({
  selector: 'app-eol',
  templateUrl: './eol.component.html',
  styleUrls: ['./eol.component.scss']
})
export class EolComponent implements OnInit, OnDestroy {
  loader: boolean = false

  hide: boolean = true
  employee: any
  leave = new Array()
  myLeaveStatus: any

  unsubMyLeaves: any
  unsubZeroLeaves: any
  unsubGetEmployee: any
  unsubLoader: any

  uid: any
  constructor(private route: ActivatedRoute, private api: ApiService, private lms: LmsService) {
    this.uid = this.route.snapshot.paramMap.get('id')
    this.unsubLoader = this.lms.emitsload.subscribe(el => this.loader = el)
    this.lms.showLoader()

    this.unsubGetEmployee = this.api.emitgetEmployee.subscribe(r => this.employee = r)
    this.unsubZeroLeaves = this.api.emitMyZero.subscribe(r => this.hide = false)
    this.unsubMyLeaves = this.api.emitMyLeaves.subscribe(r => this.leave = r)
  }
  ngOnInit() {
    this.api.getEmployee(this.uid)
    this.api.myLeaves(this.uid)
  }
  ngOnDestroy() {
    this.unsubLoader.unsubscribe()
    this.unsubGetEmployee.unsubscribe()
    this.unsubMyLeaves.unsubscribe()
    this.unsubZeroLeaves.unsubscribe()
  }
}