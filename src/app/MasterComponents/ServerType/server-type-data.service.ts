import { Injectable } from '@angular/core';
import { IServerTypeDTODetail } from './iserver-type';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerTypeDataService {
serverTypeList:IServerTypeDTODetail[];
  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getServerTypeList():Observable<IServerTypeDTODetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ServerType/List';
    return this.http.get<IServerTypeDTODetail[]>(url);
  }
  getServerTypeById(id:number):Observable<IServerTypeDTODetail>{
    if(id===0){
      return of(this.initializeServerType());
    }
    else{
      const url:string = this.dataConstantsService.BASEAPIURL + 'ServerType/GetById/' + id;
      return this.http.get<IServerTypeDTODetail>(url);
    }
  }
  add(iServerTypeDTODetail:IServerTypeDTODetail){
    const url:string = this.dataConstantsService.BASEAPIURL + 'ServerType/add';
    return this.http.post<IServerTypeDTODetail>(url,iServerTypeDTODetail);
  }
  edit(iServerTypeDTODetail:IServerTypeDTODetail){
    const url:string = this.dataConstantsService.BASEAPIURL + 'ServerType/edit';
return this.http.post<IServerTypeDTODetail>(url,iServerTypeDTODetail);
  }
  delete(id:number){
    const url:string= this.dataConstantsService.BASEAPIURL + 'ServerType/delete/' + id;
    return this.http.post(url,null);
  }
  private initializeServerType():IServerTypeDTODetail{
    //Return an initialzed object
    return {
       serverTypeId:0,
       name:null
    }
  }
}
