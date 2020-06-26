import { Injectable } from '@angular/core';
import { IUserToken } from './iuser-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userToken: IUserToken;
  private _isLoggedIn: boolean;
  constructor() { }
  public get isLoggedIn(): boolean {
    
    //return this._isLoggedIn;
    let tokenObj = sessionStorage.getItem('tokenobj');
    console.log('token obj' +tokenObj  );

    if(tokenObj==null)
    {
      this._isLoggedIn=false;
      return false;
    }
    else{
      this._isLoggedIn=false;
      return true;
    }
    //return this._isLoggedIn;

  }
  // public set isLoggedIn(value: boolean) {
  //   this._isLoggedIn = value;
  // }
 
  public get userToken(): IUserToken {
    let tokenObj = sessionStorage.getItem('tokenobj');
    console.log(tokenObj);
    this.userToken=JSON.parse(tokenObj);
    return this._userToken;

  }
  public set userToken(value: IUserToken) {
    
    this._userToken = value;
   
    if(value!=null){
      this._isLoggedIn=true;
      sessionStorage.setItem('tokenobj',JSON.stringify(value));
      sessionStorage.setItem('token',value.token);
      sessionStorage.setItem('role',value.roles);
    }
    else{
      this._isLoggedIn=false;
      sessionStorage.clear();
    }

  }

}
