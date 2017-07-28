import {Injectable}from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http:Http){
        console.log('User Service Initialized..');
    }
    getUsers(){
        return this.http.get('/api/users')
            .map(res => res.json());
    }
    
    addUser(newuser){
        console.log(newuser);
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user',JSON.stringify(newuser),{headers:headers})
            .map(res => res.json());
    }
}