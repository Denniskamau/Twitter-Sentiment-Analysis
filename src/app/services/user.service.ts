import {Injectable}from '@angular/core';
import {Http,Headers} from '@angular/http';
//observable is an ES7 feature hence RXJS is used for manipulating data.
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http:Http){
        console.log('User Service Initialized..');
    }
    //Getting users from the API
    getUsers(){
        return this.http.get('/api/users')
            .map(res => res.json());
    }
    //Adding new users to the API
    addUser(newuser){
        console.log(newuser);
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user',JSON.stringify(newuser),{headers:headers})
            .map(res => res.json());
    }
}