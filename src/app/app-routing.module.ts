import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Login platform for admin and employee
import { LoginComponent } from './login/login.component';

// Common components
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Admin components
import { CrudComponent } from './crud/crud.component';
import { EolComponent } from './eol/eol.component';
import { AddEmpComponent } from './crud/add-emp/add-emp.component';
import { EditEmpComponent } from './crud/edit-emp/edit-emp.component';
import { NewappComponent } from './newapp/newapp.component';

// Auth
import { AuthService } from './auth.service';
const routes: Routes = [
  { path:'', component:NavComponent, children:[
    { path:'dashboard', component:DashboardComponent, canActivate:[AuthService] },
    { path:'', redirectTo:'/dashboard', pathMatch:'full', canActivate:[AuthService] },
    { path:'employee-list', component:CrudComponent, canActivate:[AuthService] },
    { path:'add-employee', component:AddEmpComponent , canActivate:[AuthService]},
    { path:'employee-list/:id', component:EditEmpComponent , canActivate:[AuthService]},
    { path:'employee-section', component:NewappComponent , canActivate:[AuthService]},
    { path:'application-status', component:EolComponent , canActivate:[AuthService]},
  ]},
  { path:'login', component:LoginComponent },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
