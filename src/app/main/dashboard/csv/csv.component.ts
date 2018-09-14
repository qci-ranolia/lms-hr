import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {

  constructor() {
    var holidays = localStorage.getItem('holidays')
    // console.log(holidays)
  }
  ngOnInit() {
  }

}
