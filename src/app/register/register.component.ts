import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../../User';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

//A function to ensure that both password and confirm password are the same
function passwordMatcher(p:AbstractControl){
  return p.get('password').value === p.get('confirm').value
     ?null : {'nomatch':true};
     
}

//Function to ensure that username is not blank


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService] 
})
export class RegisterComponent implements OnInit {
//create a form property in the conmponent to be used later in the constractor.
 form = new FormGroup({
  username:new FormControl,
  email:new FormControl,
  password:new FormControl,
  confirm:new FormControl
 


 });
/*
 References to the above form group.
 Used with the adduser method to 
 pass the values to the  service
 */
  username =this.form.get('username').value;
  password=this.form.get('password').value;
  email=this.form.get('email').value;
  confirm =this.form.get('confirm').value;
  users:User[];
  /*
  username:string
  email:string
  password:string
  confirm:string
*/
 constructor(private userService: UserService,public fb:FormBuilder) { 
 
   //call the form property and use form bulder to create a form.
   this.form = this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      account:this.fb.group({
        password:['',Validators.required],
        confirm:['',Validators.required]
      },{validator:passwordMatcher})
    })
   //Gets users form the userservice.
    this.userService.getUsers()
      //observalbe
      .subscribe(users =>{
        this.users=users;
      })
    }
    // Called in the event of a submit in the html to add a new user.
  addUser($event){
    //prevent the form from automaltic submit.
    event.preventDefault();
    var newUser = {
    
      username:this.form.get('username').value,
      email:this.form.get('email').value,
      password:this.form.get('account.password').value,
      confirm:this.form.get('account.confirm').value
     
  
    }
    
    console.log(newUser)
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
