import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.userService.logout();
    this.flashMessagesService.show("You are now logged out",{
      classes:['alert','alert-success'],
      timeout:5000
    });
    this.router.navigate(['/home']);
    return false; 

  }

}
