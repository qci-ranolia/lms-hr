import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { LmsService } from '../services/lms.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  uname : any
  pwd : any

  constructor( private lms: LmsService, private router: Router) {
    this.lms.isLogin();
    this.lms.emitLogin.subscribe( (res) => this.router.navigate(['/']) )
  }

  ngOnInit() {}

  isLogin(){
    this.lms.login(this.uname, this.pwd )
    localStorage.setItem('userName', this.uname )
  }
}
