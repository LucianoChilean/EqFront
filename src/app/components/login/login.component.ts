import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public user = {
    email: 'Testing@gmail.com',
    password: '123456'
  };


  constructor(
    private authService: AuthService,
    private router: Router
  ) { 

    
  }

  ngOnInit(): void {
  }

  logIn(){
    this.authService.singin(this.user).subscribe(
      (res:any) =>{
      const {token, usuario} = res;
      localStorage.setItem('token',token);
      localStorage.setItem('email',usuario.email);
      this.router.navigate(['ticket']);
    },
    (err) =>  {
      console.log(err.status)
      if(err.status == 400){
        console.log(err)
      }
    })
  }

}
