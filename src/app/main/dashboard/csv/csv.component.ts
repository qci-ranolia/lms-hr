import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service"

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {
  unsubGetHoliday: any

  tDate: any
  month: any
  year: any

  holidays: any = new Array()
  compulsory: any = []
  minDate = new Date()

  constructor(private api: ApiService) {
    var holidays = localStorage.getItem('holidays')



    this.unsubGetHoliday = this.api.emitgetHoliday.subscribe(el => {
      setTimeout(() => {
        for (let i = 0; i < el.length; i++) {
          if (i >= el.length - 2) {
            JSON.parse(el[i].data).map(r => {
              if (r.CompulsoryHoliday) this.compulsory.push(r)
              this.holidays.push(r)
            })
          }
        }
        let d = this.tDate,
          m = this.month
        if (d < 10) this.tDate = "0" + d
        else this.tDate = d
        if (m < 10) m++ && (this.month = "0" + m)
        else m++ && (this.month = m)
        var today = String(this.tDate + "/" + this.month + "/" + this.year)
        this.holidays.push({ Today: "Today", Date: today })
        this.holidays.sort((a, b) => {
          (a = a.Date.split("/").reverse().join("")), (b = b.Date.split("/").reverse().join(""))
          return a > b ? 1 : a < b ? -1 : 0
        })
      }, 320)
      localStorage.setItem('holidays', this.holidays)
    })
  }

  ngOnInit() {
    this.tDate = this.minDate.getDate() // Get date
    this.month = this.minDate.getMonth() // Now get month
    this.year = this.minDate.getFullYear() // Now get year
    // Order does not matter here)
    this.api.getHoliday()
  }

}
