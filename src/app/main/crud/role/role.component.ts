import { Component, OnInit } from '@angular/core';
import { DialogData } from '../crud.component'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
  public dialogData : DialogData

  constructor( ) { }
  ngOnInit() { }

}
