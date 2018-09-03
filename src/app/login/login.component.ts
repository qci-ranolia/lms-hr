import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  uname: any
  pwd: any
  unsubLogin: any

  constructor(private api: ApiService, private router: Router) {
    this.api.isLogin()
    this.unsubLogin = this.api.emitLogin.subscribe((res) => this.router.navigate(['/']))
  }

  ngOnInit() { }

  isLogin() {
    this.api.login(this.uname, this.pwd)
  }
  ngOnDestroy() {
    //this.unsubLogin.unsubscribe()
  }
}
