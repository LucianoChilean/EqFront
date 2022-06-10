import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:8080';
 
  private user: object = {};

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    
    ) { }

  singin(user:object){
    return this.http.post(`${this.URL}/api/auth/login`,user);
  }

  isAuth():boolean{
    

      const token = localStorage.getItem('token') || undefined;
   
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

}
