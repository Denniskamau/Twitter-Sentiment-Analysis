import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../../User';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

function passwordMatcher(p:AbstractControl){
  return p.get('password').value === p.get('confirm').value
     ?null : {'nomatch':true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService] 
})
export class RegisterComponent implements OnInit {
 form: FormGroup;

  
  users:User[];
  username:string;
  email:string;
  password:string;

 constructor(private userService: UserService,public fb:FormBuilder) { 

   this.form = this.fb.group({
      username:'',
      email:'',
      account:this.fb.group({
        password:['',Validators.required],
       confirm:['',Validators.required]
      },{validator:passwordMatcher})
      
    })
    this.userService.getUsers()
      .subscribe(users =>{
        this.users=users;
      })
    }
    // Called in the event of a submit in the html to add a new user.
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
