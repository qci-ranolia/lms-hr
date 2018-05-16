import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Login platform for admin and employee
import { LoginComponent } from './login/login.component';

// Common components
import { NavComponent } from './main/nav/nav.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

// Admin components
import { CrudComponent } from './main/crud/crud.component';
import { AddEmpComponent } from './main/crud/add-emp/add-emp.component';
import { EditEmpComponent } from './main/crud/edit-emp/edit-emp.component';
import { EolComponent } from './main/eol/eol.component';
import { NewappComponent } from './main/newapp/newapp.component';

// Auth
import { AuthService } from './services/auth.service';
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
