import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



const URL='http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private httpClient:HttpClient) { }

  login(body:any) {    
    return this.httpClient.post(`${URL}/auth/login`,body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })    
  }

 recoveryPassword(emailData: { email: string }) {    
    return this.httpClient.post(`${URL}/auth/recover/password`, emailData ,{ 
      observe : 'response', 
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
    
  }
}