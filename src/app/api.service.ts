import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http' 
import { HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
//import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()

export class ApiService {

  URL:string = "http://13.127.13.175:5000/"
  //URL2:string = "http://192.168.15.219:5000/"
  token: string // Useful in Authentication
  headers: Headers // Useful when backend and frontend have different IP's

  constructor( private http:Http, private router: Router ){ //private http:Http, private router:Router  // we will use both imports here. Are we using anywhere in comments only ???
    
    
    this.token = localStorage.getItem('token') // If this token available, login using can activate gaurd 
    this.headers =  new Headers() // Default headers
    this.headers.append( 'Authorization', this.token ) // ADD/Append your authorized token to Default headers
  }
  Login( data: any ) {
    return this.http.post( this.URL+'lms/login', data ).map( r => r.json() )
  } 

  //HINT : Are we checking the response is a success or not ???
  GetEmployeeDetails() {
    return this.http.get( this.URL+'lms/employeeDetails').map( r => r.json() )
  }

  addEmp(data:any) {
    return this.http.post( this.URL+'lms/addEmployee', data, { headers: this.headers }).map( r => {
      r.json()
      this.router.navigate(['/employee-list'])
    })
  }

  updateEmployee(data:any) {
    return this.http.post( this.URL+'lms/editEmployeeDetails', data, { headers: this.headers }).map( r => {
      r.json()
      this.router.navigate(['/employee-list'])
    })
  }
  
  deleteEmp(data:any){
    return this.http.post( this.URL+'lms/deleteEmployee', JSON.stringify(data), { headers: this.headers }).map( r => r.json() )
  }

}