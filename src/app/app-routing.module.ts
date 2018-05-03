import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//login platform for admin and employee
import { LoginComponent } from 'leave-management-system/src/app/login/login.component';

//common components
import { NavComponent } from 'leave-management-system/src/app/nav/nav.component';
import { DashboardComponent } from 'leave-management-system/src/app/dashboard/dashboard.component';

// Admin components
import { CrudComponent } from 'leave-management-system/src/app/crud/crud.component';
import { EolComponent } from 'leave-management-system/src/app/eol/eol.component';

// User components
import { NewappComponent } from 'leave-management-system/src/app/newapp/newapp.component';
import { EditprofileComponent } from 'leave-management-system/src/app/editprofile/editprofile.component';

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
