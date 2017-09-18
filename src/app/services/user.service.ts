import {Injectable}from '@angular/core';
import {Http,Headers} from '@angular/http';
//observable is an ES7 feature hence RXJS is used for manipulating data.
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    authToken:any;
    user:any;
    constructor(private http:Http){
        console.log('User Service Initialized..');
    }
    //Getting users from the API
    getUsers(){
        return this.http.get('/api/users')
            .map(res => res.json());
    }
   
    //Register user
    registerUser(user){
        //console.log(user);
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/users/register',JSON.stringify(user),{headers:headers})
            .map(res => res.json());
    }

    authenticateUser(user){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/users/authenticate',JSON.stringify(user),{headers:headers})
            .map(res => res.json());

    }

    getProfile(){
        var headers=new Headers();
        this.loadToken();
        headers.append('Authorization',this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('/api/users/profile ',{headers:headers})
            .map(res => res.json());

    }

    storeUserData(token, user){
        localStorage.setItem('id_token',token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken=token;
        this.user= user;

    }
    logout(){
        this.authToken=null;
        this.user=null;
        localStorage.clear();

    }

    loadToken(){
        var token = localStorage.getItem('id_token');
        this.authToken = token;

    }
}