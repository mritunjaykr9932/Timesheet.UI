import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path: '',redirectTo:'/Login',pathMatch:'full'},
   {path: 'Login', component:LoginComponent},
   {path: 'Register', component:RegisterComponent},
   {path:'admin',
    canActivate:[AuthGuard],
   loadChildren:() => import('./modules/admin/admin.module').then((m) => m.AdminModule)},

   {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
