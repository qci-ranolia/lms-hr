import { Component, OnInit, OnDestroy } from "@angular/core"
import { MatDialog } from "@angular/material"
import * as moment from "moment"
import { DialogComponent } from "./dialog/dialog.component"
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

  public daysArr
  applications = new Array()
  employee = new Array()
  emp = new Array()
  empApplications = new Array()
  items = new Array()
  holidays: any = new Array()
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
    let dd: any = tmp.getDate(), mm: any = tmp.getMonth() + 1, yyyy: any = tmp.getFullYear()
    if (dd < 10) dd = "0" + dd
    if (mm < 10) mm = "0" + mm
    this.lms.getEmpOnLeave(dd + "/" + mm + "/" + yyyy)
    this.unsubLoader = this.lms.emitsload.subscribe(el => (this.loader = el))
    this.lms.showLoader()
    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(r => (this.employee = Object.values(r)))
    this.unsubEmployeesOnLeave = this.lms.emitEOL.subscribe(r => (this.applications = r))

    this.unsubEmpOnLeaveTwo = this.api.emitEmpOnLeave.subscribe(r => {
      this.emp = r
      console.log(this.emp)
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
        else this.date = d
        if (m < 10) m++ && (this.month = "0" + m)
        else m++ && (this.month = m)
        var today = String(this.tDate + "/" + this.month + "/" + this.year)
        this.holidays.push({ Today: "Today", Date: today })
        this.holidays.sort((a, b) => {
          (a = a.Date.split("/").reverse().join("")), (b = b.Date.split("/").reverse().join(""))
          return a > b ? 1 : a < b ? -1 : 0
        })
      }, 350)
    })
    this.unsubCount = this.lms.emitCount.subscribe(r => {
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
  public ngOnInit() {
    this.tDate = this.minDate.getDate() // Get date
    this.month = this.minDate.getMonth() // Now get month
    this.year = this.minDate.getFullYear() // Now get year
    // Order does not matter here)
    this.api.getHoliday()
    this.lms.getEmployees()
    this.lms.getEOL()
    // for count => getEmpOnLeave(data){}
    this.lms.postEOLBSDate(this.count)
    // for count => getEmpOnLeave(data){}
    this.api.getEmpOnLeave(this.emp)
    // this.restricted = JSON.parse(this.restricted)
    this.daysArr = this.createCalendar(this.date)
    // this.ngSpinner.hide()
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
      y: number, m: number,
      temp = [], dates = []
    // find sundays in a month
    while (c.day(7 + sunday).isBefore(s)) r.push(c.clone().format("DD/MM/YYYY"))
    // Calculate leavedays
    let td: number = s.diff(f, "days") + 1 // What is td( totalDays ) ?????
    // let leavedays : number = td - r.length

    // Get dates between current month
    // push all dates in an array
    while (f < s) temp.push(f.format("DD/MM/YYYY")) && f.add(1, "day")
    this.totalDaysOfMonth = temp
    // exclude compulsory days and sundays from current month
    setTimeout(() => {
      // map CSV holiday and push in an empty array
      this.compulsory.map(e => h.push(e["Date"]))
      // combine two arrays and sort them accordingly
      var x = h.concat(r).sort((a, b) => {
        (a = a.split("/").reverse().join("")), (b = b.split("/").reverse().join(""))
        return a > b ? 1 : a < b ? -1 : 0
      })
      // filter total working days in a given month
      this.workingDays = temp.filter(k => {
        // Find total holidays in "DD" format for styling
        if (x.indexOf(k) >= 0) (y = k.split("/").reverse().join("").slice(-2)), z.push(y)
        return x.indexOf(k) < 0
      })
      this.lms.postEOLBSDate(this.workingDays)
      // Add some ~ delay so that .subscribe() method fetch holidays from the api in given time
      // To add exact delays find epoch values of constructor, NGONINT & subscribe method
    }, 400)
    // Create a calendar for whole month which includes sundays & holidays
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(f).add(n, "d").format("DD")
      })
    // setTimeout is set to get 'z' value after some delay and find all off days in a given month
    /* setTimeout(() => {
      days.map(n => {
        if (z.indexOf(n) >= 0) this.offDays.push(n)
      })
      // console.log( this.offDays )
    }, 400) */
    // console.log( days )
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
    if (!this.postDate) {
      // next month
      this.getMonth = this.date.format("DD/MM/YYYY")
    } else {
      // previous month
      this.getMonth = this.date.format(this.postDate + "/" + "MM/YYYY")
    }
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