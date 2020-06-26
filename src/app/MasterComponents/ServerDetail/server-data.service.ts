import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { IServerDetail } from './iserver-details';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
serverList:IServerDetail[]
  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getServerList():Observable<IServerDetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'Server/list';
    return this.http.get<IServerDetail[]>(url);
  }
  getServerById(id:number):Observable<IServerDetail>{
    if(id===0){
      return of(this.initializeServerDetail());
    }
    const url:string = this.dataConstantsService.BASEAPIURL + 'Server/getById/' + id;
    return this.http.get<IServerDetail>(url);
  }
  add(iServerDetail:IServerDetail){
    const url:string = this.dataConstantsService.BASEAPIURL + 'Server/add';
    return this.http.post<IServerDetail>(url,iServerDetail);
  }
  edit(iServerDetail: IServerDetail){
    const url:string = this.dataConstantsService.BASEAPIURL + 'Server/edit';
    return this.http.post<IServerDetail>(url, iServerDetail);
  }
  delete(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'Server/delete/' + id;
    return this.http.post(url,null);
  }
  initializeServerDetail():IServerDetail{
    return {
      serverId:0,
      name:'',
      serverTypeId:0,
      serverTypeName:'',
      internalIP:'',
      externalIP:'',
      urlToAccess:'',
      notes:''
    }
  }
}
