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
import { AddEmpComponent } from './crud/add-emp/add-emp.component';
import { EditEmpComponent } from './crud/edit-emp/edit-emp.component';
import { NewappComponent } from './newapp/newapp.component';

const routes: Routes = [
  { path:'', component:NavComponent, children:[
    { path:'dashboard', component:DashboardComponent },
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'employee-list', component:CrudComponent },
    { path:'add-employee', component:AddEmpComponent },
    { path:'employee-list/:id', component:EditEmpComponent },
    { path:'employee-section', component:NewappComponent },
    { path:'application-status', component:EolComponent },
  ]},
  { path:'login', component:LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
