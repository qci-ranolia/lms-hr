import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//login platform for admin and employee
import { LoginComponent } from './login/login.component';

//common components
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Admin components
import { CrudComponent } from './crud/crud.component';
import { EolComponent } from './eol/eol.component';

// User components
import { NewappComponent } from './newapp/newapp.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  { path:'', component:NavComponent, children:[
    { path:'dashboard', component:DashboardComponent },
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'employee-list', component:CrudComponent },
    { path:'employee-section', component:NewappComponent },
    { path:'application-status', component:EolComponent },
    { path:'edit', component:EditprofileComponent }
  ]},
  { path:'login', component:LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
