import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsService } from './posts.service';
import { UsersComponent } from './users/users.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';


const appRoutes: Routes = [
  { path:'', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegisterComponent},
  {path: 'users', component:UsersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule 
  
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
