import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http' 
import { HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http'
// import{RouterModule, Routes, Router} from '@angular/router'

@Injectable()

export class ApiService {

  URL:string = "url-link"
  token:string // Useful in Authentication
  headers:Headers // Useful when backend and frontend have different IP's

  constructor(){ //private http:Http, private router:Router  // we will use both imports here. Are we using anywhere in comments only ???
    // this.token = localStorage.getItem('token') // If this token available, login using can activate gaurd 
    // this.headers =  new Headers() // Default headers
    // this.headers.append( 'Authorization', this.token ) // ADD/Append your authorized token to Default headers
  }
   
  //HINT : Are we checking the response is a success or not ???
  GetApplicaitons(){
    //return this.http.get( this.URL+'/path', { headers : this.headers }).map( response => response.json() )
  }

  PostEmployeeRequest( data:any ){
    console.log(data)// first see the data:any is our required data to post 
    let temp = JSON.stringify(data)// convert our required data so that API can interact 
    console.log(temp)// console the temp and see yourself how api interacts
    // return this.http.post( this.URL+'/path', temp, {headers: this.headers } ).map( response => this.router.navigate(['/where-do-you-want-to-navigate']));
  }

}