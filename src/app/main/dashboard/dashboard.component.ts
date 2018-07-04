import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { DialogComponent } from "./dialog/dialog.component";
// import { PieChartConfig } from '../../Models/PieChartConfig'
import { LmsService } from "../../services/lms.service";
import { ApiService } from "../../services/api.service";

declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
// NABCB, NABET, NBQP, NABH, NABL
export class DashboardComponent implements OnInit, OnDestroy {
  unsubLoader: any;

  getDate: number;
  // Calendar
  public date = moment();
  postDate: any;
  getMonth: any;
  nxtMnth: any;
  prvMnth: any;

  public daysArr;
  applications = new Array();
  employee = new Array();
  emp = new Array();
  items = new Array();
  holidays: any = new Array();
  compulsory: any = [];
  totalDaysOfMonth: any;
  combineDateEmp: any = [];
  workingDays: any;
  count: any;
  offDays: any = [];
  // page loader
  loader: boolean = false;
  hide: boolean = false;

  unsubGetEmployees: any;
  unsubEmployeesOnLeave: any;
  unsubEmpOnLeaveTwo: any;
  unsubGetHoliday: any;
  unsubCount: any;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private lms: LmsService,
    private httpClient: HttpClient
  ) {
    var tmp = new Date();
    this.getDate = tmp.getDate();
    let dd: any = tmp.getDate(),
      mm: any = tmp.getMonth() + 1,
      yyyy: any = tmp.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    this.lms.getEmpOnLeave(dd + "/" + mm + "/" + yyyy);
    this.unsubLoader = this.lms.emitsload.subscribe(el => (this.loader = el));
    this.lms.showLoader();
    this.unsubGetEmployees = this.lms.emitgetEmployees.subscribe(
      r => (this.employee = Object.values(r))
    );

    this.unsubEmployeesOnLeave = this.lms.emitEOL.subscribe(
      r => (this.applications = r)
    );

    this.unsubEmpOnLeaveTwo = this.lms.emitEmpOnLeave.subscribe(
      r => (this.emp = r)
    );

    this.unsubGetHoliday = this.api.emitgetHoliday.subscribe(el => {
      setTimeout(() => {
        for (let i = 0; i < el.length; i++) {
          if (i >= el.length - 2) {
            JSON.parse(el[i].data).map(el => {
              // console.log(el)
              if (el.CompulsoryHoliday) this.compulsory.push(el);
              this.holidays.push(el);
            });
          }
        }
        this.holidays.sort((a, b) => {
          (a = a.Date.split("/")
            .reverse()
            .join("")),
            (b = b.Date.split("/")
              .reverse()
              .join(""));
          return a > b ? 1 : a < b ? -1 : 0;
        });
      }, 350);
    });
    this.unsubCount = this.lms.emitCount.subscribe(r => {
      var x = Object.keys(r),
        y = Object.values(r); // count array
      let t: any = x,
        s: any = y;
      for (let i = 0; i < this.daysArr.length; i++) {
        // if date returned not equal to the date in a month on particular index then add holiday & assign '0' to the date key
        if (!(x[i] == this.totalDaysOfMonth[i]))
          t.splice(i, 0, this.totalDaysOfMonth[i]), s.splice(i, 0, 0);
        // create new array of the response from the server which includes holidays too
        this.combineDateEmp.push({ day: this.daysArr[i], count: s[i] });
      }
    });
  }
  // CSV Dialog
  public openUploadDialog($e) {
    $e.stopPropagation();
    let dialogRef = this.dialog.open(DialogComponent, {
      width: "50%",
      height: "50%"
    });
  }

  /* imageUpload() {
    window.onload = function(){   
        //Check File API support zzzz
      (<any>$('#files')).live("change", function( event ) {
        var files = event.target.files // FileList object
        var output = document.getElementById("result")
        for( var i = 0; i < files.length; i++ ) {
          var file = files[i]
          //Only pics
          // if(!file.type.match('image'))
          if( file.type.match('image.*') ){
            if(this.files[0].size < 2097152){    
            // continue;
            var picReader = new FileReader()
            picReader.addEventListener("load",function(event){
              var picFile = <FileReader>event.target
              var div = document.createElement("div")
              div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" + "title='preview image'>"
              output.insertBefore(div,null)
            })
            //Read the image
            $('#clear, #result').show()
            picReader.readAsDataURL(file)
            } else {
              alert("Image Size is too big. Minimum size is 2MB.")
              $(this).val("")
            }
          } else {
          alert("You can only upload image file.")
          $(this).val("")
        }
        }
      })
    }} */
  /* drawOnCanvas( file ){
    var reader = new FileReader()
    reader.onload = e => {
      var dataURL = e.target.result,
      c = document.querySelector('canvas'), // see Example 4
      ctx = c.getContext( '2d' ),
      img = new Image()
      img.onload = () => {
        c.width = img.width
        c.height = img.height
        ctx.drawImage( img, 0, 0 )
      }
      img.src = dataURL
    }
    reader.readAsDataURL( file )
  } */
  public ngOnInit() {
    // Order does not matter here)
    this.api.getHoliday();
    this.lms.getEmployees();
    this.lms.getEOL();
    this.lms.postEOLBSDate(this.count);
    this.lms.getEmpOnLeave(this.emp);
    // this.restricted = JSON.parse(this.restricted)
    this.daysArr = this.createCalendar(this.date);
    // this.ngSpinner.hide()
  }
  getEmpOnLeave(data) {
    if (!data.count) this.emp = [];
    this.getMonth = this.date.format("MM/YYYY");
    this.postDate = data.day;
    let temp = this.postDate + "/" + this.getMonth;
    this.lms.getEmpOnLeave(temp);
  }
  public todayCheck(day) {
    if (!day) return false;
    return moment().format("L") === day.format;
  }

  public createCalendar(month) {
    let f = moment(month).startOf("M"),
      s = moment(f).endOf("month"),
      sunday = 0,
      r = [],
      c = f.clone(),
      h = [],
      z = [],
      y: number,
      m: number,
      temp = [],
      dates = [];
    // find sundays in a month
    while (c.day(7 + sunday).isBefore(s))
      r.push(c.clone().format("DD/MM/YYYY"));
    // Calculate leavedays
    let td: number = s.diff(f, "days") + 1; // What is td( totalDays ) ?????
    // let leavedays : number = td - r.length

    // Get dates between current month
    // push all dates in an array
    while (f < s) temp.push(f.format("DD/MM/YYYY")) && f.add(1, "day");
    this.totalDaysOfMonth = temp;
    // exclude compulsory days and sundays from current month
    setTimeout(() => {
      // map CSV holiday and push in an empty array
      this.compulsory.map(e => h.push(e["Date"]));
      // combine two arrays and sort them accordingly
      var x = h.concat(r).sort((a, b) => {
        (a = a
          .split("/")
          .reverse()
          .join("")),
          (b = b
            .split("/")
            .reverse()
            .join(""));
        return a > b ? 1 : a < b ? -1 : 0;
      });
      // filter total working days in a given month
      this.workingDays = temp.filter(k => {
        // Find total holidays in "DD" format for styling
        if (x.indexOf(k) >= 0)
          (y = k
            .split("/")
            .reverse()
            .join("")
            .slice(-2)),
            z.push(y);
        return x.indexOf(k) < 0;
      });
      this.lms.postEOLBSDate(this.workingDays);
      // Add some ~ delay so that .subscribe() method fetch holidays from the api in given time
      // To add exact delays find epoch values of constructor, NGONINT & subscribe method
    }, 400);
    // Create a calendar for whole month which includes sundays & holidays
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(f)
          .add(n, "d")
          .format("DD");
      });
    // setTimeout is set to get 'z' value after some delay and find all off days in a given month
    setTimeout(() => {
      days.map(n => {
        if (z.indexOf(n) >= 0) this.offDays.push(n);
      });
      // console.log( this.offDays )
    }, 400);
    // console.log( days )
    return days;
  }
  /* $('.main h3').attr('id','myd_1')
  (function() {
    var fixed = $('.navbar')
    $(window).on('scroll',function() {
      var currentFixedDivPosition = fixed.position().top + fixed.height() + $(window).scrollTop()
      var temp, whichOne
      $('.mains h3').each( function (i,s) {
        var diff = Math.abs( $(s).position().top - currentFixedDivPosition)
        if (temp) {
          if( diff < temp ) {
            temp = diff
            whichOne = s
            var tct = $(whichOne).text()
            $('.left-menus').text(tct)
          }
        } else {
          temp = diff;
          whichOne = s;
          var tcta = $(whichOne).text();
          $('.left-menus').text(tcta);
        }
      })
      $('.mblView > .navbar-nav:visible').css('height','100vh')
    })
  })(). */
  public nextMonth() {
    this.date.add(1, "M") && this.cmnProgram();
  }
  public previousMonth() {
    this.date.subtract(1, "M") && this.cmnProgram();
  }
  cmnProgram() {
    this.daysArr = this.createCalendar(this.date);
    if (!this.postDate) this.getMonth = this.date.format("DD/MM/YYYY");
    else this.getMonth = this.date.format(this.postDate + "/" + "MM/YYYY");
  }
  ngOnDestroy() {
    this.unsubGetEmployees.unsubscribe();
    this.unsubEmployeesOnLeave.unsubscribe();
    this.unsubEmpOnLeaveTwo.unsubscribe();
    this.unsubGetHoliday.unsubscribe();
    this.unsubCount.unsubscribe();
  }
}
