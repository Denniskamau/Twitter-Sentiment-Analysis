import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import {Search} from '../../Search';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[SearchService] 
})

/* Set the width of the side navigation to 250px */

export class DashboardComponent implements OnInit {
  results = [];
  positiveTweet:String;
  negativeTweet:String ;
  myResult = this.results[1];
  form = new FormGroup({
    search:new FormControl
  });

  search= this.form.get('search').value;
  searches:Search[];
 
  constructor(private searchService: SearchService,public fb:FormBuilder) { 

    this.form=this.fb.group({
      search:''

    })

    

    
  }

  ngOnInit() {
  }

  loadResult(){
    console.log("load result initialized");
    var list = this.searchService.getResult();
    var fields = list.split('%');
    var positive = fields [0];
    var negative = fields [1];
    this.positiveTweet = positive;
    this.negativeTweet = negative;
    console.log("Positive results" + positive);
    console.log ("negative results" + negative);
    //this.results.push(JSON.stringify(listItem));
    //var show = console.log(window.$log = ("Results from list : " +this.results));
    //alert (show);
  }

  postSearch($event){
    event.preventDefault();

    console.log("Hapo sawa");

    var searchword={
         search:this.form.get('search').value
     }
    //  console.log(searchword)
    var myResult =  this.searchService.postSearch(searchword)
         .subscribe(search =>{
           this.search='';


         });
  
  
    }
   
  
    
      
   }

 


