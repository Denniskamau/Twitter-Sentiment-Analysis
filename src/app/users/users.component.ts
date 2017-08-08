import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../../User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService]

})
export class UsersComponent implements OnInit {

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

<<<<<<< HEAD
  addUser(event){
=======
  addTask(event){
>>>>>>> d2fecab55a4f8db2e8db247178871dfe0ea65455
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