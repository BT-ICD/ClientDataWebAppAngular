import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from '../CommonServices/data-constants.service';
import { IUserLogin, IUserToken } from './iuser-detail';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  verifyUser(userLogin:IUserLogin){
    const url:string = this.dataConstantsService.BASEAPIURL + 'Authenticate/Login';
    return this.http.post<IUserToken>(url,userLogin);
  }
  initializeUserDetail():IUserLogin{
    return {
      username:'',
      password:''
    };
  }
}
