import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserService } from './services/user.service';
import { UsersComponent } from './users/users.component';
import { SearchService } from './services/search.service';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ClassificationComponent } from './classification/classification.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';
import {ValidateService} from './services/validate.service';
import { FlashMessagesModule } from 'ngx-flash-messages';





const appRoutes: Routes = [
  { path:'', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegisterComponent},
  {path: 'users', component:UsersComponent},
  {path: 'dashboard',component:DashboardComponent} ,
  {path: 'user', component:UserComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'chart', component:ChartComponent},
  { path: '**', redirectTo: '' }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    
    UsersComponent,
    
    DashboardComponent,
    
    ClassificationComponent,
    
    UserComponent,
    
    ProfileComponent,
    
    ChartComponent,
    ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule ,
    FlashMessagesModule

    
    
  
  ],
  providers: [UserService,SearchService,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
