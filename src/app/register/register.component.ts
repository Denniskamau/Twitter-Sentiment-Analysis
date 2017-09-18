import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../../User';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import {ValidateService} from '../services/validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService] 
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email: String;
  password:String;
   



 constructor(private userService: UserService,
  public fb:FormBuilder,
  private validateService:ValidateService,
  private flashMessagesService: FlashMessagesService,
  private router:Router) { 
 
  
  }
  ngOnInit() {
    
    
  }
  onRegisterSubmit(){
    var user ={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }

    //Validate fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show('Please fill in all the fields',{
        classes:['alert','alert-warning'],
        timeout:1000
      });
      
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please use a valid email',{
        classes:['alert','alert-warning'],
        timeout:1000
      });
      return false;
    }

    //Register User
    this.userService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessagesService.show('You are now registerd and can login',{
          classes:['alert','alert-success'],
          
        });
        this.router.navigate(['/home'])

      }else{
        this.flashMessagesService.show('Something Went wrong',{
          classes:['alert','alert-danger'],
          
        });
        this.router.navigate(['/register'])

      }
    })
  }


}
