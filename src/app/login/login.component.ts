import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  uname: any
  pwd: any
  unsubLogin: any
  email_id:any
  name:any
  password:any
  
  constructor(private api: ApiService, private router: Router) {}

  isLogin() {
    localStorage.setItem('userName', this.uname)
    this.api.login(this.uname, this.pwd)
  }

  signup(){
    this.api.signup(this.name, this.password, this.email_id)
  }

  ngOnInit() {
    this.api.isLogin()
    this.unsubLogin = this.api.emitLogin.subscribe((res) => {
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 200 )
    })
  }
  
}
