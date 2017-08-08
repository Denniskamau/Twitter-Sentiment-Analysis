import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../../User'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

  users:User[];
  username:string;
  email:string;
  password:string;
 constructor(private userService: UserService) { 
    this.userService.getUsers()
      .subscribe(users =>{
        this.users=users;
      })
    }

  addUser(event){
    event.preventDefault();
    var newUser = {
      username:this.username,
      email:this.email,
      password:this.password
    }
    this.userService.addUser(newUser)
      .subscribe(user =>{
        this.users.push(user);
        this.username='',
        this.email='',
        this.password=''
      });
  }
  ngOnInit() {
  }

}
