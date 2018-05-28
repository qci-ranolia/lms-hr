import { Component, OnInit } from '@angular/core'
import { LmsService } from '../../services/lms.service'
import { PieChartConfig } from '../../Models/PieChartConfig'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'


// import { NgxChartsModule } from '@swimlane/ngx-charts'
import * as moment from 'moment'
// import { Ng4SpinnerService } from 'ng4-spinner'

declare var google : any

@Component({
  selector : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'Reusable charts sample'

  getDate : number

  data1 : any[]
  config1 : PieChartConfig
  elementId1 : String

  data2 : any[]
  config2 : PieChartConfig
  elementId2 : String
  
  // Calendar
  public date = moment()
  public daysArr
  
  // data 
  employee = new Array

  // page loader
  loader : boolean = false

  file:any
  formGroup = this.fb.group({
    file: [null, Validators.required]
  })
  filesToUpload: Array<File> = [];
  constructor( private lms: LmsService, private fb:FormBuilder ){ //, private ngSpinner:Ng4SpinnerService
    var tmp = new Date()
    this.getDate = tmp.getDate()
    
    this.lms.emitsload.subscribe( el => this.loader = el )
    this.lms.showLoader()

    
    this.lms.emitgetEmployees.subscribe( r => {
      this.employee = Object.values(r)
      // console.log(this.employee)
    }) 
  
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   '+ formData.toString());
    this.lms.postHoliday(formData)
    // this.http.post('http://localhost:3003/upload', formData)
    //     .map(files => files.json())
    //     .subscribe(files => console.log('files', files))
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
  onFileChange(event) {
    let reader = new FileReader()
    // console.log(reader)
    if( event.target.files && event.target.files.length ){
      console.log(event.target.files)
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        })  
        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck()
      }
      this.file = file
    }
  }
  onSubmit(){
    this.lms.postHoliday( this.file )
  }

  public ngOnInit() {
    
    this.data1 = [
      ['Task', 'Hours per Day'],
      ['ZED', 3],
      ['NBQP', 2],
      ['NABET', 5],
      ['NABH', 4],
      ['NABCB', 10]
    ]

    this.config1 = new PieChartConfig( 'Board Section 1', 0.4 )
    this.elementId1 = 'myPieChart1'

    //Piechart2 Data & Config
    this.data2 = [
      ['Task', 'Hours per Day'],
      ['QZED', 21],
      ['NBQP', 2],
      ['NABET', 2],
      ['NABH', 2],
      ['NABCB', 7]
    ]

    this.config2 = new PieChartConfig( 'Board Section 2', 0.4 )
    this.elementId2 = 'myPieChart2'

    this.lms.getEmployees()
    this.daysArr = this.createCalendar( this.date )
    // this.ngSpinner.hide()
  }
  
  public todayCheck( day ){
    if (!day){
      return false
    }
    return moment().format( "L" ) === day.format 
  }

  public createCalendar( month ) {
    let firstDay = moment(month).startOf( "M" )
    let days = Array.apply( null, { length: month.daysInMonth() } )
      .map( Number.call, Number )
      .map ( (n) => {
        return moment(firstDay).add( n, 'd' )
      })
      return days
  }

  public nextMonth() {
    this.date.add( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }

  public previousMonth() {
    this.date.subtract( 1, 'M' )
    this.daysArr = this.createCalendar( this.date )
  }

}
