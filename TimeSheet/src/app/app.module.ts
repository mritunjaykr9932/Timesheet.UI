import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './modules/admin/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './modules/admin/components/header/header.component';
import { HomeComponent } from './modules/admin/components/home/home.component';


@NgModule({
  declarations: [		
    AppComponent,
      
      
      RegisterComponent,
      LoginComponent,
      SidebarComponent,
      AdminDashboardComponent,
      HeaderComponent,
      HomeComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     FormsModule,
     Ng2SearchPipeModule,
     MatToolbarModule,
     BrowserAnimationsModule,
     MatButtonModule,
     ReactiveFormsModule,
     HttpClientModule,
      MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
