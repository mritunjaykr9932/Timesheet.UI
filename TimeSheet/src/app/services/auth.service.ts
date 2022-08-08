import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

 public currentUser: BehaviorSubject<any> = new BehaviorSubject( null);

baseUrl='https://localhost:7233/api/'

jwtHelperService = new JwtHelperService();


registerUser(user: Array<String>)
{
  return this.http.post(this.baseUrl + "User/CreateUser",{
    
    FirstName:user[0],
    LastName:user[1],
    Email:user[2],
    Mobile:user[3],
    Gender:user[4],
    Pwd:user[5],
  },{
    responseType:"text",
  }
  
  );
}

registerUsers()
{
  return this.http.get(this.baseUrl);
}

loginUser(loginInfo:Array<string>)
{
  return this.http.post(this.baseUrl+'User/LoginUser',{
    Email:loginInfo[0],
    Pwd:loginInfo[1],
  },{
     responseType:"text",
  });
}
setToken(token: string){
  localStorage.setItem("access_token",token);
  
  this.loadCurrentUser();
  }
getToken(token:string)
  {
    localStorage.getItem(token);
    this.loadCurrentUser();
  }
public loadCurrentUser()
{
    const token = localStorage.getItem("access_token");
    const userInfo= token !=null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      id: userInfo.id,
      firstname:userInfo.firstname,
      lastname:userInfo.lastname,
      email:userInfo.email,
      mobile:userInfo.mobile,
      gender:userInfo.gender
    } :null;
    
   
    
 this.currentUser.next(data?.firstname);
    localStorage.setItem("UserData",JSON.stringify(data?.firstname));
        console.log(this.currentUser.value);
      
}
isLoggedIn():boolean{
  return localStorage.getItem("access_token") ? true : false;
}

removeToken()
{
  localStorage.removeItem("access_token");
}

}
