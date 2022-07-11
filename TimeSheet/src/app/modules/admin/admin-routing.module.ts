import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';

const routes: Routes = [
  {path: '',component:AdminDashboardComponent,
    children:[
      {path:'home',component:HomeComponent},
      {path:'profile',component:ProfileComponent},
      {path:'timesheet',component:TimesheetComponent},
      {path:'',redirectTo:'/admin/home',pathMatch:'full'},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
