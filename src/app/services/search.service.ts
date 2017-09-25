import {Injectable}from '@angular/core';
import {Http,Headers} from '@angular/http';
//observable is an ES7 feature hence RXJS is used for manipulating data.
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService{
    tweets= []
    constructor(private http:Http){
        console.log('Search Service Initialized..');
    }
    

    
    //Adding new search to the API
    postSearch(searchword){
        console.log("Service : " + JSON.stringify( searchword));
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/search',JSON.stringify(searchword),{headers:headers})
            .map(res => {
                var result = res.json();
                console.log("Result From Search.js : " + result);
                this.tweets.push(result);
                return result;
            });
         
            
    }

    getResult(){
        
        console.log("results from Get Result: "+this.tweets);
        var list = JSON.stringify( this.tweets);
        return list 
        
        //return JSON.stringify( this.tweets)
       // return this.tweets
                
    }
    
}