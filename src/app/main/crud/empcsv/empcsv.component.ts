import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material'
import { ApiService } from '../../../services/api.service'
// import { forkJoin } from 'rxjs/observable/forkJoin'
import { LmsService } from '../../../services/lms.service'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-empcsv',
  templateUrl: './empcsv.component.html',
  styleUrls: ['./empcsv.component.scss']
})
export class EmpcsvComponent implements OnInit {
  @ViewChild('file') file
  public files: Set<File> = new Set()

  progress
  canBeClosed = true
  primaryButtonText = 'Upload'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  constructor( public dialogRef: MatDialogRef<EmpcsvComponent>, public lms: LmsService, private api: ApiService ){
    this.api.emitgetHoliday.subscribe( e => e )
  }

  ngOnInit(){}

  addFiles(){
    this.file.nativeElement.click()
    // console.log(this.file.nativeElement)
  }

  onFilesAdded() {
    const files : { [ key : string ] : File } = this.file.nativeElement.files
    for ( let key in files ) {
      if ( !isNaN( parseInt( key ))) {
        this.files.add( files[ key ])
      }
    }
  }

  closeDialog() {
    console.log("d")
    var excelJsonObject = []
    var myFile = this.file.nativeElement
    var input = myFile
    var reader = new FileReader()
    console.log(reader)
    reader.onload = function(){
      var fileData = reader.result
      var workbook = XLSX.read(fileData,{type:'binary'})
      workbook.SheetNames.forEach(function(sheetName){
        console.log(sheetName)
        // var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
        // excelJsonObject = rowObject
      })

      // for ( var i = 0; i< excelJsonObject.length; i++ ){
      //   var data = excelJsonObject[i]
      //   console.log(data)
      // }
    }
    
    // // if everything was uploaded already, just close the dialog
    // if (this.uploadSuccessful){
    //   return this.dialogRef.close()
    // }
    // // set the component state to "uploading"
    // this.uploading = true
    // // start the upload and save the progress map
    // this.progress = this.api.uploadEmployee(this.files)
    // // convert the progress map into an array
    // let allProgressObservables = []
    // for (let key in this.progress) {
    //   allProgressObservables.push(this.progress[key].progress)
    // }
    // // Adjust the state variables
    // // The Upload button should have the text "Finish" now
    // this.primaryButtonText = 'Finish'
    // // The dialog should not be closed while uploading
    // this.canBeClosed = false
    // this.dialogRef.disableClose = true
    // // cancel-button state
    // this.showCancelButton = false
    // // When all progress-observables are completed . . .
    // forkJoin(allProgressObservables).subscribe(end=>{
    //   // . . . the dialog can be closed again . . .
    //   this.canBeClosed = true
    //   this.dialogRef.disableClose = false
    //   // . . . the upload was successful . . .
    //   this.uploadSuccessful = true
    //   // . . . and the component is no longer uploading
    //   this.uploading = false
    //   // this.api.postEmployeeCSV()
    // })
  }
}