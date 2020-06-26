import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IUserLogin, IUserToken } from './iuser-detail';
import { UserDataService } from './user-data.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  userLogin:IUserLogin;
  constructor(private userDataService: UserDataService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.userLogin=this.userDataService.initializeUserDetail();
  }
  loginButtonClick(f:NgForm){
    if(f.valid){
      this.userDataService.verifyUser(this.userLogin).subscribe({
        next:data=>this.onLoginSuccess(data),
        error: err=>this.onLoginError(err)
      });
    }
  }
  onLoginSuccess(userToken:IUserToken){
    this.authService.userToken=userToken;
    console.log(userToken);
    this.router.navigate(['/home']);
  }
  onLoginError(err){
    this.errorMessage = err.statusText;
  }
}
