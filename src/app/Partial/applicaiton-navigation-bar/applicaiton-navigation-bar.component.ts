import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user-login/auth.service';

@Component({
  selector: 'app-applicaiton-navigation-bar',
  templateUrl: './applicaiton-navigation-bar.component.html',
  styleUrls: ['./applicaiton-navigation-bar.component.css']
})
export class ApplicaitonNavigationBarComponent implements OnInit {
  public isMenuCollapsed = true;
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  get isLoggedIn():Boolean{
    return this.authService.isLoggedIn;
  }
  logout(){
    this.authService.userToken=null;
    this.isMenuCollapsed = true;
    console.log('logout');
  }
 
}
