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

  postSearch($event){
    event.preventDefault();
     var searchword={
         search:this.form.get('search').value
     }
     console.log(searchword)
     this.searchService.postSearch(searchword)
         .subscribe(search =>{
           this.searches.push(search);
           this.search=''
         });
     
   }

}
