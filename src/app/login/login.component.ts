import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(private userService: UserService,
              private flashMessagesService: FlashMessagesService,
              private router:Router
            ) { }

  ngOnInit() {
  }
  onLogInSubmit(){
    var user={
      username:this.username,
      password:this.password
    }
    this.userService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.userService.storeUserData(data.token,data.user);
        this.flashMessagesService.show("You are now logged in",{
          classes:['alert','alert-success'],
          timeout:5000
        });
        this.router.navigate(['/dashboard'])

      }else{
        this.flashMessagesService.show(data.msg,{
          classes:['alert','alert-danger'],
          timeout:5000
        });
        this.router.navigate(['/home'])
      }

    })
  }

}
