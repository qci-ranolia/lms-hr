import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http' 
import { HttpErrorResponse, HttpParams, HttpHeaders, HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
@Injectable()
export class ApiService {
  // URL : string = "http://13.127.13.175:5000/"
  URL : string = "http://192.168.15.55:5000/"
  token : string // Useful in Authentication
  headers : any // Useful when backend and frontend have different IP's
  opts : any // Find more details about backend configuration
  constructor( private http : Http, private router : Router, private httpCSV : HttpClient ) {
    // Private http : Http, private router : Router
    // We will use both imports here. Are we using anywhere in comments only ???
    this.token = localStorage.getItem('token') // If this token available, login using can activate gaurd
    this.headers =  new Headers() // Default headers
    this.headers.append('Authorization',this.token) // ADD/Append your authorized token to Default headers
    this.opts = new RequestOptions()
    this.opts.headers = this.headers
  }
  // Login Section
  Login( data:any ){
    return this.http.post( this.URL+'lms/loginAdmin', data ).map( r => r.json() )
  }
  // Get Requests
  // HINT : Are we checking the response is a success or not ???
  // Get Employee
  GetEmployeeDetails(){
    return this.http.get( this.URL+'lms/employeeDetails', this.opts ).map( r => r.json() )
  }
  // Get Employee_on_leave
  getEOL(){
    return this.http.get( this.URL+'lms/input', this.opts ).map( r => r.json() )
  }
  // Get QCI Calendar
  getHoliday(){
    return this.http.get( this.URL+'lms/holiday', this.opts ).map( r => r.json() )
  }
  // Get approved employee list on leaves
  approvedLeave(){
    return this.http.get( this.URL+'lms/output1', this.opts ).map( r => r.json() )
  }
  // Post month dates to get employee on leave in a month
  postEOLBSDate(data : any){
    let tmp = { dates:data }
    return this.http.post( this.URL+'lms/empOnLeave', tmp , this.opts ).map( r => r.json() )
  }
  // Post( Add New Employee ) requests
  addEmp( data : any ){
    return this.http.post( this.URL+'lms/addEmployee', data, this.opts ).map( r => r.json() )
  }
  // Post( Update Existing Employee ) requests
  updateEmployee( data : any ){
    return this.http.post( this.URL+'lms/editEmployeeDetails', data, this.opts ).map( r => r.json() )
  }
  // Post ( Delete Existing Employee ) requests
  deleteEmp( data : any ){
    return this.http.post( this.URL+'lms/deleteEmployee', JSON.stringify( data ), this.opts ).map( r => r.json() )
  }
  // post employee application for approval
  leaveForApproval( data:any ){
    return this.http.post( this.URL+'lms/approveLeave', data, this.opts ).map( r => r.json() )
  }

}