import { Component, OnInit, OnDestroy } from "@angular/core"
import { MatDialog } from "@angular/material"
import * as moment from "moment"
import { DialogComponent } from "./dialog/dialog.component"
import { CsvComponent } from "./csv/csv.component"
import { LmsService } from "../../services/lms.service"
import { ApiService } from "../../services/api.service"
// declare var $: any
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
// NABCB, NABET, NBQP, NABH, NABL
export class DashboardComponent implements OnInit, OnDestroy {
  unsubLoader: any

  getDate: number
  // Calendar
  public date = moment()
  minDate = new Date()

  postDate: any
  getMonth: any
  nxtMnth: any
  prvMnth: any

  Mnth: any
  Year: any

  public daysArr
  applications = new Array()
  employee = new Array()
  emp = new Array()
  empApplications = new Array()
  items = new Array()
  holidays: any = new Array()

  Contract = new Array
  Regular = new Array
  Professional = new Array

  compulsory: any = []
  totalDaysOfMonth: any
  combineDateEmp: any = []
  workingDays: any
  count: any
  offDays: any = []
  // page loader
  loader: boolean = false
  hide: boolean = false
  isDisabled: boolean = true

  tDate: any
  month: any
  year: any

  unsubGetEmployees: any
  unsubEmployeesOnLeave: any
  unsubEmpOnLeaveTwo: any
  unsubGetHoliday: any
  unsubCount: any
  unsubEmpApplication: any

  constructor(public dialog: MatDialog, private api: ApiService, private lms: LmsService) {//, private httpClient: HttpClient 
    var tmp = new Date()
    this.getDate = tmp.getDate()

    let dd: any = tmp.getDate(),
      mm: any = tmp.getMonth() + 1,
      yyyy: any = tmp.getFullYear()
    if (dd < 10) dd = "0" + dd
    if (mm < 10) mm = "0" + mm

    this.api.getEmpOnLeave(dd + "/" + mm + "/" + yyyy)

    this.unsubLoader = this.lms.emitsload.subscribe(el => (this.loader = el))
    this.lms.showLoader()

    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => {
      this.employee = Object.values(r)
      for (let i = 0; i < r.length; i++) {
        switch (r[i].type_of_employee) {
          case "Contract":
            this.Contract.push(r[i])
            break
          case "Professional":
            this.Professional.push(r[i])
            break
          case "Regular":
            this.Regular.push(r[i])
        }
      }
    })
    this.unsubEmployeesOnLeave = this.lms.emitEOL.subscribe(r => {
      this.applications = r
    })
    this.unsubEmpOnLeaveTwo = this.api.emitEmpOnLeave.subscribe(r => {
      this.emp = r
    })
    this.unsubEmpApplication = this.api.emitEmpApp.subscribe(r => {
      this.empApplications = r
    })
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
        if (m < 9) m++ && (this.month = "0" + m)
        else m++ && (this.month = m)
        var today = String(this.tDate + "/" + this.month + "/" + this.year)
        this.holidays.push({ Today: "Today", Date: today })
        this.holidays.sort((a, b) => {
          (a = a.Date.split("/").reverse().join("")), (b = b.Date.split("/").reverse().join(""))
          return a > b ? 1 : a < b ? -1 : 0
        })
      }, 320)
    })
    this.unsubCount = this.api.emitCount.subscribe(r => {
      var x = Object.keys(r), y = Object.values(r) // count array
      let t: any = x, s: any = y
      if (!(this.combineDateEmp.length >= 1)) {
        for (let i = 0; i < this.daysArr.length; i++) {
          // if date returned not equal to the date in a month on particular index then add holiday & assign '0' to the date key
          if (!(x[i] == this.totalDaysOfMonth[i])) t.splice(i, 0, this.totalDaysOfMonth[i]), s.splice(i, 0, 0)
          // create new array of the response from the server which includes holidays too
          this.combineDateEmp.push({ day: this.daysArr[i], count: s[i] })
        }
      }
    })
  }
  // CSV Dialog
  public openUploadDialog($e) {
    $e.stopPropagation()
    let dialogRef = this.dialog.open(DialogComponent, { width: "50%", height: "50%" })
  }
  public openCSV($e) {
    $e.stopPropagation()
    let dialogRef = this.dialog.open(CsvComponent, { width: "50%", height: "85%" })
  }
  public ngOnInit() {
    this.tDate = this.minDate.getDate() // Get date
    this.month = this.minDate.getMonth() // Now get month
    this.year = this.minDate.getFullYear() // Now get year
    // Order does not matter here)
    this.api.getHoliday()
    this.lms.getEmployees()
    this.api.getEOL()
    this.daysArr = this.createCalendar(this.date)
  }
  getEmpOnLeave(data) {
    if (!data.count) this.emp = []
    this.getMonth = this.date.format("MM/YYYY")
    this.postDate = data.day
    let temp = this.postDate + "/" + this.getMonth
    this.api.getEmpOnLeave(temp)
  }
  public todayCheck(day) {
    if (!day) return false
    return moment().format("L") === day.format
  }
  public createCalendar(month) {
    this.combineDateEmp = []
    this.daysArr = this.combineDateEmp
    let f = moment(month).startOf("M"), s = moment(f).endOf("month"),
      sunday = 0,
      r = [], c = f.clone(), h = [], z = [],
      y: number,// m : number,
      temp = []// , dates = []
    // Find sundays in a month
    while (c.day(7 + sunday).isBefore(s)) r.push(c.clone().format("DD/MM/YYYY"))
    // Calculate leavedays
    let td: number = s.diff(f, "days") + 1 // What is td( totalDays ) ?????
    // let leavedays : number = td - r.length

    // Get dates between current month
    // push all dates in an array
    while (f < s) {
      temp.push(f.format("DD/MM/YYYY"))
      f.add(1, "day")
    }// Calendar date consoling next month due to this while loop
    f = moment(month).startOf('M')
    this.totalDaysOfMonth = temp
    // exclude compulsory days and sundays from current month
    setTimeout(() => {
      // map CSV holiday and push in an empty array
      this.compulsory.map(e => h.push(e["Date"]))
      // Combine two arrays and sort them accordingly
      var x = h.concat(r).sort((a, b) => {
        a = a.split("/").reverse().join(""), b = b.split("/").reverse().join("")
        return a > b ? 1 : a < b ? -1 : 0
      })
      // filter total working days in a given month
      this.workingDays = temp.filter(k => {
        // Find total holidays in "DD" format for styling
        if (x.indexOf(k) >= 0) (y = k.split("/").reverse().join("").slice(-2)), z.push(y)
        return x.indexOf(k) < 0
      })
      this.api.postEOLBSDate(this.workingDays)
      // Add some ~ delay so that .subscribe() method fetch holidays from the api in given time
      // To add exact delays find epoch values of constructor, NGONINT & subscribe method and may be more xaces be considered
    }, 380)
    // Create a calendar for whole month which includes sundays & holidays
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(f).add(n, "d").format("DD")
      })
    return days
  }
  public nextMonth() {
    this.date.add(1, "M")
    this.cmnProgram()
  }
  public previousMonth() {
    this.date.subtract(1, "M")
    this.cmnProgram()
  }
  cmnProgram() {
    this.daysArr = this.createCalendar(this.date)
    if (!this.postDate) this.getMonth = this.date.format("DD/MM/YYYY") // Next Month
    else this.getMonth = this.date.format(this.postDate + "/" + "MM/YYYY") // Prev Month
  }
  ngOnDestroy() {
    this.unsubGetEmployees.unsubscribe()
    this.unsubEmployeesOnLeave.unsubscribe()
    this.unsubEmpOnLeaveTwo.unsubscribe()
    this.unsubGetHoliday.unsubscribe()
    this.unsubCount.unsubscribe()
    this.unsubEmpApplication.unsubscribe()
  }
}
